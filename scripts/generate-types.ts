#!/usr/bin/env ts-node-transpile-only

import { ResolverOptions } from '@apidevtools/json-schema-ref-parser';
import { strict as assert } from 'assert';
import { promises as fs } from 'fs';
import { JSONSchema7 } from 'json-schema';
import { compileFromFile } from 'json-schema-to-typescript';
import path from 'path';
import { Options } from 'prettier';
import { prettier as prettierConfigPackage } from '../package.json';

const prettierConfig: Options = {
  // eslint-disable-next-line @typescript-eslint/no-require-imports,node/global-require,@typescript-eslint/no-var-requires
  ...(require(prettierConfigPackage) as Options),
  // this is the one property we don't explicitly set in our config :/
  printWidth: 80
};

/*
  this requires the octokit/webhooks repo cloned, and the schemas pr branch checked out:

  git clone git@github.com:octokit/webhooks.git gh-schemas
  cd gh-schemas
  git checkout pr/186
 */
const pathToWebhookSchemas = 'src/schemas';

const removeExtension = (fileName: string, ext: string): string => {
  assert.ok(fileName.endsWith(ext), `"${fileName}" does not end with "${ext}"`);

  return fileName.substring(0, fileName.length - ext.length);
};

const fetchCommonSchemas = async () => {
  const pathToCommonSchemasDir = `${pathToWebhookSchemas}/common`;
  const commonSchemaFiles = (
    await fs.readdir(pathToCommonSchemasDir)
  ).filter(fileName => fileName.endsWith('.schema.json'));

  return Promise.all(
    commonSchemaFiles.map(async name => {
      const schema = JSON.parse(
        await fs.readFile(`${pathToCommonSchemasDir}/${name}`, 'utf-8')
      ) as JSONSchema7;

      if (!schema.title) {
        console.warn(`common schema ${name} does an empty or undefined title`);
      }

      return schema;
    })
  );
};

interface ExternalInterfaceSchemaResolver extends ResolverOptions {
  /**
   * Adds import statements for all the external schemas that were resolved by
   * this resolver to the given typescript code.
   *
   * @param {string} code
   *
   * @return {string}
   */
  addImports(code: string): string;
}

const createCommonSchemaResolver = async (): Promise<ExternalInterfaceSchemaResolver> => {
  const commonSchemas = await fetchCommonSchemas();
  const interfacesToImport = new Set<string>();

  return {
    canRead: file => {
      const { base } = path.parse(file.url);

      return commonSchemas.find(({ $id }) => base === $id) !== undefined;
    },
    read: file => {
      const { base } = path.parse(file.url);
      const schema = commonSchemas.find(({ $id }) => $id === base);

      assert.ok(schema);

      const tsType = schema.title ?? schema.$id ?? base;

      interfacesToImport.add(tsType);

      return JSON.stringify({ tsType });
    },
    addImports: code => {
      if (interfacesToImport.size === 0) {
        return code;
      }

      const lines = code.split('\n');
      const joinedIdentifiers = Array.from(interfacesToImport)
        .sort((a, b) => a.localeCompare(b))
        .join(', ');

      lines.splice(1, 0, `import { ${joinedIdentifiers} } from '../common';`);

      return lines.join('\n');
    }
  };
};

const compileSchema = async (pathToSchema: string): Promise<string> => {
  const commonSchemaResolver = await createCommonSchemaResolver();

  return commonSchemaResolver.addImports(
    await compileFromFile(pathToSchema, {
      $refOptions: { resolve: { commonSchemaResolver } },
      style: prettierConfig
    })
  );
};

const writeTypesForSchema = async (pathToSchema: string) => {
  const { dir, base } = path.parse(pathToSchema);
  const fileName = removeExtension(base, '.schema.json');

  await fs.writeFile(
    `${dir}/${fileName}.d.ts`,
    await compileSchema(pathToSchema)
  );
};

const writeBarrelForDirectory = async (directory: string, extra = '') => {
  const pathToDirectory = `${pathToWebhookSchemas}/${directory}`;
  const directoryContents = await fs.readdir(pathToDirectory, {
    withFileTypes: true
  });

  const fileContents = directoryContents
    .filter(d => d.isDirectory() || d.name.endsWith('.schema.json'))
    .map(({ name }) =>
      name.endsWith('.schema.json')
        ? removeExtension(name, '.schema.json')
        : name
    )
    .map(name => `export * from './${name}';`)
    .concat(extra.trimEnd())
    .join('\n');

  await fs.writeFile(
    `${pathToDirectory}/index.d.ts`,
    `${fileContents.trim()}\n`
  );
};

const titleCase = (str: string) => `${str[0].toUpperCase()}${str.substring(1)}`;

const guessAtInterfaceName = (str: string) =>
  str.split('_').map(titleCase).join('');

const buildUnion = (name: string, elements: string[]): string[] => {
  const union = `export type ${name} = ${elements.join(' | ')};`;

  if (elements.length > 1 && union.length > 80) {
    const lastIndex = elements.length - 1;

    return [
      `export type ${name} =`,
      ...elements.map(
        (element, i) => `  | ${element}${lastIndex === i ? ';' : ''}`
      )
    ];
  }

  return [union];
};

const buildEventUnion = (eventName: string, schemas: string[]) => {
  // singular events are already called "event", so don't need a union
  if (schemas.includes('event.schema.json')) {
    return '';
  }

  const eventInterfaceName = guessAtInterfaceName(eventName);
  const schemaAndInterfaceNames: Array<
    [schemaName: string, interfaceName: string]
  > = schemas
    .map(fileName => removeExtension(fileName, '.schema.json'))
    .map(schemaName => [
      schemaName,
      `${eventInterfaceName}${guessAtInterfaceName(schemaName)}Event`
    ]);

  const imports = schemaAndInterfaceNames.map(
    ([schemaName, interfaceName]) =>
      `import { ${interfaceName} } from './${schemaName}';`
  );

  const formattedUnion = buildUnion(
    `${eventInterfaceName}Event`,
    schemaAndInterfaceNames.map(([, interfaceName]) => interfaceName)
  );

  return ['', ...imports, '', ...formattedUnion].join('\n');
};

const writeTypesForEvent = async (eventName: string, noUnion = false) => {
  const pathToEventSchemasDir = `${pathToWebhookSchemas}/${eventName}`;
  const schemas = (await fs.readdir(pathToEventSchemasDir)).filter(fileName =>
    fileName.endsWith('.schema.json')
  );

  await Promise.all(
    schemas.map(async fileName => {
      await writeTypesForSchema(`${pathToEventSchemasDir}/${fileName}`);
    })
  );

  await writeBarrelForDirectory(
    eventName,
    noUnion ? '' : buildEventUnion(eventName, schemas)
  );

  console.log('generated', schemas.length, 'types for', eventName);
};

const listEvents = async () => {
  const dirents = await fs.readdir(pathToWebhookSchemas, {
    withFileTypes: true
  });

  return dirents
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'common')
    .map(dirent => dirent.name);
};

const buildEventPayloadMap = (events: string[]): string => {
  const [imports, properties] = events.reduce<
    [imports: string[], properties: string[]]
  >(
    (importsAndProperties, event) => {
      const interfaceName = `${guessAtInterfaceName(event)}Event`;

      importsAndProperties[0].push(
        `import { ${interfaceName} } from './${event}';`
      );
      importsAndProperties[1].push(`  ${event}: ${interfaceName};`);

      return importsAndProperties;
    },
    [[], []]
  );

  return [
    ...imports,
    '',
    'export interface EventPayloadMap {',
    ...properties,
    '}'
  ].join('\n');
};

(async () => {
  const events = await listEvents();

  console.log('found', events.length, 'events');

  // technically not an event, but it'll be fine
  await writeTypesForEvent('common', true);

  await Promise.all(
    events.map(async eventName => {
      await writeTypesForEvent(eventName);
    })
  );

  await writeBarrelForDirectory('', `\n${buildEventPayloadMap(events)}`);
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
