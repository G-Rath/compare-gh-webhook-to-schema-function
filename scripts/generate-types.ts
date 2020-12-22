#!/usr/bin/env ts-node-transpile-only

import { strict as assert } from 'assert';
import { promises as fs } from 'fs';
import { compileFromFile } from 'json-schema-to-typescript';
import path from 'path';

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

const writeTypesForSchema = async (pathToSchema: string) => {
  const { dir, base } = path.parse(pathToSchema);
  const fileName = removeExtension(base, '.schema.json');

  const ts = await compileFromFile(pathToSchema);

  await fs.writeFile(`${dir}/${fileName}.d.ts`, ts);
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

  await Promise.all(
    events.map(async eventName => {
      await writeTypesForEvent(eventName);
    })
  );
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
