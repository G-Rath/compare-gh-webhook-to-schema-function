import Ajv, { ValidateFunction } from 'ajv';
import { ErrorObject } from 'ajv/dist/types';
import { OneOfError } from 'ajv/dist/vocabularies/applicator/oneOf';
import { EnumError } from 'ajv/dist/vocabularies/validation/enum';
import { JSONSchema7 } from 'json-schema';
import { vol } from 'memfs';
import { mocked } from 'ts-jest/utils';
import { EventValidator, GithubEvent, Logger } from '../../../src/github';
import { pingEventPayload } from '../../fixtures';

jest.mock('ajv');
jest.mock('ajv-formats', () => (ajv: Ajv) => ajv);

const mockedAjv = mocked(Ajv, true);
const schemaValidatorMock =
  jest.fn() as unknown as jest.MockedFunction<ValidateFunction>;

const jsonSchema = (s: JSONSchema7): string => JSON.stringify(s, null, 2);

const mockLogger: jest.Mocked<Logger> = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};

const oneOfError = (): OneOfError => ({
  keyword: 'oneOf',
  instancePath: '',
  schemaPath: '#/oneOf',
  params: { passingSchemas: null },
  message: 'should match exactly one schema in oneOf'
});

describe('EventValidator', () => {
  beforeEach(() => {
    // manually reset the `errors` array
    delete schemaValidatorMock.errors;

    mockedAjv.prototype.compile.mockReturnValue(schemaValidatorMock);
    vol.fromNestedJSON({ common: {}, ping: {} }, 'src/schemas');
  });

  describe('~validate', () => {
    it('returns the result of #validate', () => {
      const event: GithubEvent = { name: 'ping', payload: pingEventPayload };
      const errors: typeof schemaValidatorMock.errors = [oneOfError()];

      schemaValidatorMock.errors = errors;

      expect(EventValidator.validate(event, mockLogger)).toStrictEqual(errors);
    });

    describe('when given a custom logger', () => {
      it('is used for logging', () => {
        const event: GithubEvent = { name: 'ping', payload: pingEventPayload };

        EventValidator.validate(event, mockLogger);

        expect(mockLogger.info).toHaveBeenCalledWith(expect.any(String));
      });
    });
  });

  describe('#constructor', () => {
    it('compiles a validator with an inline schema', () => {
      // eslint-disable-next-line no-new
      new EventValidator('ping', mockLogger);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockedAjv.prototype.compile).toHaveBeenCalledWith(
        expect.objectContaining<JSONSchema7>({
          $schema: 'http://json-schema.org/draft-07/schema'
        })
      );
    });

    it('references each schema in the events schema directory', () => {
      vol.fromNestedJSON(
        {
          ping: {
            'event-1.schema.json': jsonSchema({ $id: 'ping$event-1' }),
            'event-2.schema.json': jsonSchema({ $id: 'ping$event-2' }),
            'event-3.schema.json': jsonSchema({ $id: 'ping$event-3' })
          }
        },
        'src/schemas'
      );

      // eslint-disable-next-line no-new
      new EventValidator('ping', mockLogger);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockedAjv.prototype.compile).toHaveBeenCalledWith(
        expect.objectContaining<JSONSchema7>({
          oneOf: [
            { $ref: 'ping$event-1' },
            { $ref: 'ping$event-2' },
            { $ref: 'ping$event-3' }
          ]
        })
      );
    });

    it('logs to the given logger', () => {
      // eslint-disable-next-line no-new
      new EventValidator('ping', mockLogger);

      expect(mockLogger.info).toHaveBeenCalledWith(expect.any(String));
    });
  });

  describe('#validate', () => {
    it('validates against the payload', () => {
      const event: GithubEvent = { name: 'ping', payload: pingEventPayload };
      const validator = new EventValidator(event.name, mockLogger);

      validator.validate(event);

      expect(schemaValidatorMock).toHaveBeenCalledWith(event.payload);
    });

    describe('when the errors include an enum', () => {
      const enumError = (
        allowedValues: string[],
        instancePath: string
      ): EnumError => ({
        keyword: 'enum',
        instancePath,
        schemaPath: '#/properties/action/enum',
        params: { allowedValues },
        message: 'should be equal to one of the allowed values'
      });

      it('merges them', () => {
        schemaValidatorMock.errors = [
          enumError(['opened'], '/action'),
          enumError(['locked'], '/action'),
          {
            keyword: 'additionalProperties',
            instancePath: '/pull_request',
            schemaPath: '#/properties/pull_request/additionalProperties',
            params: { additionalProperty: 'active_lock_reason' },
            message: 'should NOT have additional properties'
          },
          {
            keyword: 'additionalProperties',
            instancePath: '/pull_request',
            schemaPath: '#/properties/pull_request/additionalProperties',
            params: { additionalProperty: 'active_lock_reason' },
            message: 'should NOT have additional properties (seriously)'
          },
          enumError(['unlocked'], '/action'),
          oneOfError()
        ];

        const event: GithubEvent = { name: 'ping', payload: pingEventPayload };
        const validator = new EventValidator(event.name, mockLogger);

        const resultedErrors = validator.validate(event);

        expect(resultedErrors).toStrictEqual<ErrorObject[]>([
          enumError(['opened', 'locked', 'unlocked'], '/action'),
          {
            keyword: 'additionalProperties',
            instancePath: '/pull_request',
            schemaPath: '#/properties/pull_request/additionalProperties',
            params: { additionalProperty: 'active_lock_reason' },
            message: 'should NOT have additional properties'
          },
          {
            keyword: 'additionalProperties',
            instancePath: '/pull_request',
            schemaPath: '#/properties/pull_request/additionalProperties',
            params: { additionalProperty: 'active_lock_reason' },
            message: 'should NOT have additional properties (seriously)'
          },
          oneOfError()
        ]);
      });

      it('merges them based on their instancePaths', () => {
        schemaValidatorMock.errors = [
          enumError(['completed'], '/action'),
          enumError(['queued'], '/check_run/status'),
          enumError(['completed'], '/check_run/status'),
          {
            keyword: 'oneOf',
            instancePath: '',
            schemaPath: '#/oneOf',
            params: { passingSchemas: null },
            message: 'should match exactly one schema in oneOf'
          }
        ];

        const event: GithubEvent = { name: 'ping', payload: pingEventPayload };
        const validator = new EventValidator(event.name, mockLogger);

        const resultedErrors = validator.validate(event);

        expect(resultedErrors).toStrictEqual<ErrorObject[]>([
          enumError(['completed'], '/action'),
          enumError(['queued', 'completed'], '/check_run/status'),
          oneOfError()
        ]);
      });
    });
  });
});
