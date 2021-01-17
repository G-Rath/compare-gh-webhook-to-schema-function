#!/usr/bin/env ts-node-transpile-only

/* eslint-disable node/no-sync */

import webhooksSchema from '@octokit/webhooks-definitions/schema.json';
import { strict as assert } from 'assert';
import fs from 'fs';
import { JSONSchema7 } from 'json-schema';

const outDir = 'src/schemas';

fs.mkdirSync(`${outDir}/common`, { recursive: true });

// splits the schema.json in @octokit/webhooks-definitions into
// the schema-per-event file format that the source repo has,
// as that's whats expected by the other scripts (for now)

const getFolderAndSchemaName = (
  id: string,
  key: string
): [folderName: string, schemaName: string] => {
  if (id.startsWith('#/definitions/')) {
    return ['common', key];
  }

  const [folderName, schemaName] = id.split('$');

  return [folderName, schemaName];
};

Object.entries(
  webhooksSchema.definitions as Record<string, JSONSchema7>
).forEach(([key, definition]) => {
  if (definition.oneOf) {
    return;
  }

  assert.ok(definition.$id);

  const [folderName, schemaName] = getFolderAndSchemaName(definition.$id, key);

  fs.mkdirSync(`${outDir}/${folderName}`, { recursive: true });

  const contents = JSON.parse(
    JSON.stringify(definition, (key, value: unknown) => {
      if (typeof value === 'string' && value.startsWith('#/definitions/')) {
        const ref = value.substring('#/definitions/'.length);

        const fileName = `${ref}.schema.json`;

        // restore $refs back to pointing at common schemas
        return folderName !== 'common' || key === '$id'
          ? `common/${fileName}`
          : fileName;
      }

      return value;
    })
  ) as JSONSchema7;

  fs.writeFileSync(
    `${outDir}/${folderName}/${schemaName}.schema.json`,
    `${JSON.stringify(contents, null, 2)}\n`
  );
});
