#!/usr/bin/env ts-node-transpile-only

import { ResolverOptions } from '@apidevtools/json-schema-ref-parser';
import { strict as assert } from 'assert';
import { promises as fs } from 'fs';
import { JSONSchema4, JSONSchema7 } from 'json-schema';
import { compile } from 'json-schema-to-typescript';
import path from 'path';
import { Options, format } from 'prettier';
import { prettier as prettierConfigPackage } from '../package.json';

const prettierConfig: Options = {
  // eslint-disable-next-line @typescript-eslint/no-require-imports,node/global-require,@typescript-eslint/no-var-requires
  ...(require(prettierConfigPackage) as Options),
  // this is the one property we don't explicitly set in our config :/
  printWidth: 80
};

const pathToWebhookSchemas = 'src/schemas';

const removeExtension = (fileName: string, ext: string): string => {
  assert.ok(fileName.endsWith(ext), `"${fileName}" does not end with "${ext}"`);

  return fileName.substring(0, fileName.length - ext.length);
};

const fetchCommonSchemas = async (): Promise<Map<string, JSONSchema7>> => {
  const pathToCommonSchemasDir = `${pathToWebhookSchemas}/common`;
  const commonSchemaFiles = (await fs.readdir(pathToCommonSchemasDir)).filter(
    fileName => fileName.endsWith('.schema.json')
  );

  return new Map(
    await Promise.all(
      commonSchemaFiles.map(async name => {
        const schema = JSON.parse(
          await fs.readFile(`${pathToCommonSchemasDir}/${name}`, 'utf-8')
        ) as JSONSchema7;

        if (!schema.title) {
          console.warn(
            `common schema ${name} does an empty or undefined title`
          );
        }

        return [name, schema] as const;
      })
    )
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

let commonSchemas: Map<string, JSONSchema7>;

const createCommonSchemaResolver = async (
  pathToSchema: string
): Promise<ExternalInterfaceSchemaResolver> => {
  const isForCommonSchema = pathToSchema.includes('common/');
  const interfacesToImport = new Set<string>();

  // cache results of fetch in-case we're called again
  commonSchemas ||= await fetchCommonSchemas();

  return {
    canRead: file => {
      const { base } = path.parse(file.url);

      return commonSchemas.has(base);
    },
    read: file => {
      const { base } = path.parse(file.url);
      const schema = commonSchemas.get(base);

      assert.ok(schema);

      const tsType = guessAtInterfaceName(schema.title ?? schema.$id ?? base);

      interfacesToImport.add(tsType);

      return JSON.stringify({ tsType });
    },
    addImports: code => {
      if (interfacesToImport.size === 0) {
        return code;
      }

      const lines = code.split('\n');
      const importPath = isForCommonSchema ? '.' : '../common';
      const joinedIdentifiers = Array.from(interfacesToImport)
        .sort((a, b) => a.localeCompare(b))
        .join(', ');

      lines.splice(
        1,
        0,
        `import { ${joinedIdentifiers} } from '${importPath}';`
      );

      return lines.join('\n');
    }
  };
};

declare module 'json-schema' {
  interface JSONSchema7 {
    tsAdditionalProperties?: JSONSchema7['additionalProperties'];
  }
}

const isJsonSchemaObject = (object: unknown): object is JSONSchema7 =>
  typeof object === 'object' && object !== null && !Array.isArray(object);

const stripExtension = (filename: string): string =>
  filename.replace(path.extname(filename), '');

const compileSchema = async (pathToSchema: string): Promise<string> => {
  const commonSchemaResolver = await createCommonSchemaResolver(pathToSchema);
  // has to be 4 due to https://github.com/bcherny/json-schema-to-typescript/issues/359
  const schema: JSONSchema4 = JSON.parse(
    await fs.readFile(pathToSchema, 'utf-8'),
    (key, value: unknown) => {
      if (isJsonSchemaObject(value) && 'tsAdditionalProperties' in value) {
        value.additionalProperties = value.tsAdditionalProperties;
      }

      return value;
    }
  ) as JSONSchema4;

  return commonSchemaResolver.addImports(
    await compile(schema, stripExtension(pathToSchema), {
      $refOptions: {
        resolve: {
          commonSchemaResolver,
          file: { order: Infinity }
        }
      },
      style: prettierConfig
    })
  );
};

const writeTypesForSchema = async (pathToSchema: string) => {
  const { dir, base } = path.parse(pathToSchema);
  const fileName = removeExtension(base, '.schema.json');

  await fs.writeFile(
    `${dir}/${fileName}.d.ts`,
    format(await compileSchema(pathToSchema), {
      ...prettierConfig,
      parser: 'typescript'
    })
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

const guessAtInterfaceName = (str: string): string =>
  str
    .replace(/[()]/gu, '')
    .split(/[$_ -]/u)
    .map(titleCase)
    .join('');

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

  // populate cache early to avoid doing it more than once
  commonSchemas = await fetchCommonSchemas();

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
