#!/usr/bin/env ts-node-transpile-only

/* eslint-disable node/no-sync */

import fs from 'fs';
import { JSONSchema7 } from 'json-schema';

/*
  this requires the octokit/webhooks repo cloned, and the schemas pr branch checked out:

  git clone git@github.com:octokit/webhooks.git gh-schemas
  cd gh-schemas
  git checkout pr/186
 */
const pathToWebhookSchemas = 'gh-schemas/payload-schemas/schemas';
const outDir = 'src/schemas';

const makeDirectory = (target: string) => {
  fs.mkdirSync(target, { recursive: true });
};

const copyDirectory = (source: string, target: string, recursive = false) => {
  const contents = fs.readdirSync(source, { withFileTypes: true });

  makeDirectory(target);

  for (const dirent of contents) {
    const from = `${source}/${dirent.name}`;
    const to = `${target}/${dirent.name}`;

    if (dirent.isDirectory() && recursive) {
      copyDirectory(from, to);

      continue;
    }

    fs.copyFileSync(from, to);
  }
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

const copyEventSchema = (eventName: string) => {
  const eventFolder = `${outDir}/${eventName}`;

  makeDirectory(eventFolder);

  const eventSchema = JSON.parse(
    fs.readFileSync(`${pathToWebhookSchemas}/${eventName}.schema.json`, 'utf-8')
  ) as JSONSchema7;

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
      JSON.stringify(schema, null, 2)
    );
  });

  return schemas;
};

const getEventName = (fileName: string): string => {
  const split = fileName.split('.');

  if (split.length > 3) {
    console.warn('event name for', fileName, "probably won't be right");
  }

  return split[0];
};

const eventsWithSchemas = fs
  .readdirSync(pathToWebhookSchemas)
  .filter(fileName => fileName.endsWith('.schema.json'))
  .map(fileName => getEventName(fileName));

console.log('found', eventsWithSchemas.length, 'schemas');

makeDirectory(outDir);
copyDirectory(`${pathToWebhookSchemas}/common`, `${outDir}/common`);

eventsWithSchemas.forEach(eventName => {
  const eventDirectory = `${outDir}/${eventName}`;

  makeDirectory(eventDirectory);

  const schemas = copyEventSchema(eventName);

  console.log('wrote', schemas.length, 'schemas for', eventName);
});
