#!/usr/bin/env ts-node-transpile-only

/* eslint-disable node/no-sync */

import webhooksSchema from '@octokit/webhooks-definitions/schema.json';
import { strict as assert } from 'assert';
import fs from 'fs';
import { JSONSchema7 } from 'json-schema';

const outDir = 'src/schemas';

const getOriginalEventName = (name: string): string => {
  // common schemas don't end with 'event'
  if (!name.endsWith('_event')) {
    return `common/${name}`;
  }

  return `${name.substring(0, name.length - '_event'.length)}`;
};

const findEventActions = (schema: JSONSchema7): string[] => {
  const actions: string[] = [];

  if (
    schema.properties?.action &&
    typeof schema.properties.action !== 'boolean'
  ) {
    const values = schema.properties.action.enum ?? [];

    actions.push(...values.filter((v): v is string => typeof v === 'string'));
  }

  return actions;
};

// eslint-disable-next-line @typescript-eslint/ban-types
const cloneObject = <TObject extends object>(object: TObject): TObject =>
  JSON.parse(JSON.stringify(object)) as TObject;

const createSchemaForAction = (
  schema: JSONSchema7,
  action: string,
  idPrefix: string
): JSONSchema7 => {
  const newSchema = cloneObject(schema);

  newSchema.properties ||= {};
  newSchema.properties.action ||= {};

  if (typeof newSchema.properties.action === 'boolean') {
    throw new Error('action is a boolean for some reason');
  }

  newSchema.properties.action.enum = [action];
  newSchema.$id = `${idPrefix}$${action}`;
  newSchema.title = `${idPrefix} ${action} event`;

  return newSchema;
};

const createEventSchemas = (eventName: string, eventSchema: JSONSchema7) => {
  const eventFolder = `${outDir}/${eventName}`;

  fs.mkdirSync(eventFolder, { recursive: true });

  const actions = findEventActions(eventSchema);
  const schemas: Array<
    [name: string, schema: JSONSchema7]
  > = actions.map(eventAction => [
    eventAction,
    createSchemaForAction(eventSchema, eventAction, eventName)
  ]);

  if (actions.length === 0) {
    // no actions were found for the event, so push the event in with a scoped id
    const newSchema = cloneObject(eventSchema);

    newSchema.$id = `${eventName}$event`;
    newSchema.title = `${eventName} event`;

    schemas.push(['event', newSchema]);
  }

  schemas.forEach(([name, schema]) => {
    fs.writeFileSync(
      `${eventFolder}/${name}.schema.json`,
      `${JSON.stringify(schema, null, 2)}\n`
    );
  });

  return schemas;
};

fs.mkdirSync(`${outDir}/common`, { recursive: true });

type NameAndSchema = [name: string, schema: JSONSchema7];

// splits the schema.json in @octokit/webhooks-definitions into
// the schema-per-event file format that the source repo has,
// as that's whats expected by the other scripts (for now)

const [eventsWithSchemas, commonsWithSchemas] = Object.entries(
  webhooksSchema.definitions as Record<string, JSONSchema7>
).reduce<
  [eventsWithSchemas: NameAndSchema[], commonsWithSchemas: NameAndSchema[]]
>(
  (arrays, nameAndSchema) => {
    const originalName = getOriginalEventName(nameAndSchema[0]);
    const isCommonSchema = originalName.startsWith('common/');
    const arr = arrays[isCommonSchema ? 1 : 0];

    arr.push(nameAndSchema);

    return arrays;
  },
  [[], []]
);

assert.ok(eventsWithSchemas.length > 0, 'no event schemas found!');
assert.ok(commonsWithSchemas.length > 0, 'no common schemas found!');

console.log('found', eventsWithSchemas.length, 'event schemas');
console.log('found', commonsWithSchemas.length, 'common schemas');

commonsWithSchemas.forEach(([name, contents]) => {
  const fileName = `common/${name}.schema.json`;
  const schema = cloneObject(contents);

  schema.title = `${name[0].toUpperCase()}${name.substring(1)}`;
  schema.$id = fileName;

  fs.writeFileSync(
    `${outDir}/${fileName}`,
    `${JSON.stringify(schema, null, 2)}\n`
  );
});

eventsWithSchemas.forEach(([name, definition]) => {
  const eventName = getOriginalEventName(name);
  const schemas = createEventSchemas(
    eventName,
    JSON.parse(
      JSON.stringify(definition, (key, value: unknown) => {
        if (typeof value === 'string' && value.startsWith('#/definitions/')) {
          const ref = value.substring('#/definitions/'.length);

          // restore $refs back to pointing at common schemas
          return `common/${ref}.schema.json`;
        }

        return value;
      })
    )
  );

  console.log('wrote', schemas.length, 'schemas for', eventName);
});
