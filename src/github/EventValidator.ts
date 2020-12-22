import Ajv, { ErrorObject, ValidateFunction } from 'ajv';
import { strict as assert } from 'assert';
import fs from 'fs';
import { JSONSchema7 } from 'json-schema';
import path from 'path';
import { GithubEvent } from './types';

const pathToSchemas = path.join(__dirname, '../schemas');

export type Logger = Pick<Console, 'info' | 'warn' | 'error'>;

export class EventValidator<
  TEventName extends GithubEvent['name'],
  TEvent extends Extract<GithubEvent, { name: TEventName }>
> {
  private readonly _ajv = new Ajv();
  private readonly _validator: ValidateFunction<TEvent>;
  private readonly _eventName: string;
  private readonly _logger: Logger;

  public static validate<TStaticEvent extends GithubEvent>(
    event: TStaticEvent,
    logger: Logger = console
  ): ErrorObject[] {
    return new this(event.name, logger).validate(event);
  }

  public constructor(eventName: TEventName, logger: Logger = console) {
    this._eventName = eventName;
    this._logger = logger;

    this._addSchemasFromDirectory('common');
    const schemaIds = this._addSchemasFromDirectory(eventName);

    this._validator = this._ajv.compile({
      $schema: 'http://json-schema.org/draft-07/schema',
      $id: eventName,
      oneOf: schemaIds.map(id => ({ $ref: id }))
    });
  }

  /**
   * Reads all the JSON schemas within the given `directory`.
   *
   * A file is assumed to be a JSON schema if it ends with `.schema.json`.
   *
   * @param {string} directory
   *
   * @return {JSONSchema7[]}
   * @private
   */
  private _readSchemasInDirectory(directory: string): JSONSchema7[] {
    const directoryPath = `${pathToSchemas}/${directory}`;

    // eslint-disable-next-line node/no-sync
    return fs
      .readdirSync(directoryPath)
      .filter(file => file.endsWith('.schema.json'))
      .map(
        file =>
          JSON.parse(
            // eslint-disable-next-line node/no-sync
            fs.readFileSync(`${directoryPath}/${file}`, 'utf-8')
          ) as JSONSchema7
      );
  }

  /**
   * Adds all the JSON schemas within the given `directory`,
   * and returns their `$id`s.
   *
   * If a schema does not have an `$id`, an error is thrown.
   *
   * @param {string} directory
   *
   * @return {string[]}
   * @private
   */
  private _addSchemasFromDirectory(directory: string): string[] {
    const schemas = this._readSchemasInDirectory(directory);

    const ids = schemas.map((schema, index) => {
      this._ajv.addSchema(schema);

      assert.ok(schema.$id, `schema ${directory}#${index} does not have an id`);

      return schema.$id;
    });

    this._logger.info(
      `added ${ids.length} schemas from ${directory}: ${ids.join(', ')}`
    );

    return ids;
  }

  public validate(event: TEvent): ErrorObject[] {
    this._validator(event.payload);

    return this._validator.errors ?? [];
  }
}
