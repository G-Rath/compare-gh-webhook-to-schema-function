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

const writeBarrelForDirectory = async (directory: string) => {
  const pathToDirectory = `${pathToWebhookSchemas}/${directory}`;
  const directoryContents = await fs.readdir(pathToDirectory, {
    withFileTypes: true
  });

  await fs.writeFile(
    `${pathToDirectory}/index.d.ts`,
    directoryContents
      .filter(d => d.isDirectory() || d.name.endsWith('.schema.json'))
      .map(({ name }) =>
        name.endsWith('.schema.json')
          ? removeExtension(name, '.schema.json')
          : name
      )
      .map(name => `export * from './${name}';`)
      .concat('') // add an empty line for a trailing newline
      .join('\n')
  );
};

const writeTypesForEvent = async (eventName: string) => {
  const pathToEventSchemasDir = `${pathToWebhookSchemas}/${eventName}`;
  const schemas = (await fs.readdir(pathToEventSchemasDir)).filter(fileName =>
    fileName.endsWith('.schema.json')
  );

  await Promise.all(
    schemas.map(async fileName => {
      await writeTypesForSchema(`${pathToEventSchemasDir}/${fileName}`);
    })
  );

  await writeBarrelForDirectory(eventName);

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

(async () => {
  const events = await listEvents();

  console.log('found', events.length, 'events');

  // technically not an event, but it'll be fine
  await writeTypesForEvent('common');

  await Promise.all(
    events.map(async eventName => {
      await writeTypesForEvent(eventName);
    })
  );

  await writeBarrelForDirectory('');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
