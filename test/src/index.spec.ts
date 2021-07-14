import { Context, HttpRequest, Logger } from '@azure/functions';
import { OneOfError } from 'ajv/dist/vocabularies/applicator/oneOf';
import { mocked } from 'ts-jest/utils';
import { handler } from '../../src';
import { EventValidator, GithubEvent, getEvent } from '../../src/github';
import { Notifier } from '../../src/notifier';
import { pingEventPayload } from '../fixtures';

jest.mock('../../src/notifier');
jest.mock('../../src/github/getEvent');
jest.mock('../../src/github/EventValidator');

const mockNotifier = mocked(Notifier, true);
const mockEventValidator = mocked(EventValidator, true);
const getEventMock = mocked(getEvent);

const doneFn = jest.fn();

const createMockLogger = (): jest.Mocked<Logger> => {
  const logger = jest.fn() as unknown as jest.Mocked<Logger>;

  /* eslint-disable jest/prefer-spy-on */
  logger.info = jest.fn();
  logger.warn = jest.fn();
  logger.error = jest.fn();
  logger.verbose = jest.fn();
  /* eslint-enable jest/prefer-spy-on */

  return logger;
};

const mockLogger = createMockLogger();

const oneOfError = (): OneOfError => ({
  keyword: 'oneOf',
  dataPath: '',
  schemaPath: '#/oneOf',
  // https://github.com/ajv-validator/ajv/issues/1367
  params: { passingSchemas: null as unknown as [number, number] },
  message: 'should match exactly one schema in oneOf'
});

// a fake context to get us through the day
const fakeContext: Context = {
  bindingData: {},
  bindingDefinitions: [],
  bindings: {},
  executionContext: {
    invocationId: 'string',
    functionName: 'string',
    functionDirectory: 'string'
  },
  invocationId: '',
  log: mockLogger,
  traceContext: { traceparent: null, tracestate: null, attributes: null },
  done: doneFn
};

const buildHttpRequest = (): HttpRequest => {
  return {
    method: 'POST',
    params: {},
    query: {},
    url: 'https://mysite.com',
    headers: {
      'x-github-event': 'repository',
      'x-github-delivery': 'hello world',
      'x-hub-signature': '',
      'x-hub-signature-256': ''
    },
    rawBody: {}
  };
};

describe('handler', () => {
  describe('when the event is from github', () => {
    beforeEach(() => {
      getEventMock.mockResolvedValue(event);
    });

    const event: GithubEvent = { name: 'ping', payload: pingEventPayload };

    it('validates the event', async () => {
      const request = buildHttpRequest();

      await handler(fakeContext, request);

      expect(mockEventValidator.validate).toHaveBeenCalledWith(
        event,
        mockLogger
      );
    });

    describe('when the event is found to be valid', () => {
      beforeEach(() => {
        mockEventValidator.validate.mockReturnValue([]);
      });

      it('returns OK', async () => {
        const request = buildHttpRequest();

        await expect(
          handler(fakeContext, request) //
        ).resolves.toHaveProperty('statusCode', 200);
      });

      it('responds with a positive summary', async () => {
        const request = buildHttpRequest();

        const { body } = await handler(fakeContext, request);

        expect(body).toHaveProperty(
          'summary',
          expect.stringContaining('success!')
        );
      });
    });

    describe('when the event is found to be invalid', () => {
      beforeEach(() => {
        mockEventValidator.validate.mockReturnValue([oneOfError()]);
      });

      it('returns with a 422', async () => {
        const request = buildHttpRequest();

        await expect(
          handler(fakeContext, request) //
        ).resolves.toHaveProperty('statusCode', 422);
      });

      it('includes the errors in the response', async () => {
        const request = buildHttpRequest();

        const { body } = await handler(fakeContext, request);

        expect(body).toHaveProperty('errors', [oneOfError()]);
      });
    });
  });

  describe('when there is an error', () => {
    beforeEach(() => {
      getEventMock.mockImplementation(() => {
        throw new Error('oh noes!');
      });
    });

    it('sends a message to slack with the stack trace', async () => {
      const request = buildHttpRequest();

      await handler(fakeContext, request);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockNotifier.prototype.send).toHaveBeenCalledWith({
        text: expect.stringContaining('oh noes!') as string
      });
    });

    it('returns a 500', async () => {
      const request = buildHttpRequest();

      await expect(
        handler(fakeContext, request) //
      ).resolves.toHaveProperty('statusCode', 500);
    });

    describe("when the error doesn't have a stack", () => {
      beforeEach(() => {
        getEventMock.mockImplementation(() => {
          const error = new Error("oh noes, we don't have a stack trace!");

          delete error.stack;

          throw error;
        });
      });

      it('uses the message instead', async () => {
        const request = buildHttpRequest();

        await handler(fakeContext, request);

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(mockNotifier.prototype.send).toHaveBeenCalledWith({
          text: expect.stringContaining(
            "oh noes, we don't have a stack trace!"
          ) as string
        });
      });
    });
  });
});
