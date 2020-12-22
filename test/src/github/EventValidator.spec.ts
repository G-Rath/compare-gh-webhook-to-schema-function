import Ajv, { ValidateFunction } from 'ajv';
import { JSONSchema7 } from 'json-schema';
import { vol } from 'memfs';
import { mocked } from 'ts-jest/utils';
import { EventValidator, GithubEvent, Logger } from '../../../src/github';
import pingEvent from '../../fixtures/ping.json';

jest.mock('ajv');

const mockedAjv = mocked(Ajv, true);
const schemaValidatorMock = (jest.fn() as unknown) as jest.MockedFunction<ValidateFunction>;

const jsonSchema = (s: JSONSchema7): string => JSON.stringify(s, null, 2);

const mockLogger: jest.Mocked<Logger> = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};

describe('EventValidator', () => {
  beforeEach(() => {
    mockedAjv.prototype.compile.mockReturnValue(schemaValidatorMock);
    vol.fromNestedJSON({ common: {}, ping: {} }, 'src/schemas');
  });

  describe('~validate', () => {
    it('returns the result of #validate', () => {
      const event: GithubEvent = { name: 'ping', payload: pingEvent };
      const errors: typeof schemaValidatorMock.errors = [
        {
          keyword: 'oneOf',
          dataPath: '',
          schemaPath: '#/oneOf',
          params: { passingSchemas: null },
          message: 'should match exactly one schema in oneOf'
        }
      ];

      schemaValidatorMock.errors = errors;

      expect(EventValidator.validate(event, mockLogger)).toStrictEqual(errors);
    });

    describe('when given a custom logger', () => {
      it('is used for logging', () => {
        const event: GithubEvent = { name: 'ping', payload: pingEvent };

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

    describe('when given a custom logger', () => {
      it('is used for logging', () => {
        // eslint-disable-next-line no-new
        new EventValidator('ping', mockLogger);

        expect(mockLogger.info).toHaveBeenCalledWith(expect.any(String));
      });
    });
  });

  describe('#validate', () => {
    it('validates against the payload', () => {
      const event: GithubEvent = { name: 'ping', payload: pingEvent };
      const validator = new EventValidator(event.name, mockLogger);

      validator.validate(event);

      expect(schemaValidatorMock).toHaveBeenCalledWith(event.payload);
    });
  });
});
