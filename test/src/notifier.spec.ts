import { IncomingWebhook } from '@slack/webhook';
import { mocked } from 'ts-jest/utils';
import { Notifier } from '../../src/notifier';

jest.mock('@slack/webhook');

const fakeIncomingWebhook = mocked(IncomingWebhook, true);

describe('Notifier', () => {
  describe('constructor', () => {
    it('throws an error if SLACK_WEBHOOK_URL is not in env', () => {
      delete process.env.SLACK_WEBHOOK_URL;

      expect(() => {
        // eslint-disable-next-line no-new
        new Notifier();
      }).toThrow(/Missing SLACK_WEBHOOK_URL/u);
    });
  });

  describe('#send', () => {
    describe('when there are no errors', () => {
      it('sends the given message to the Slack webhook', async () => {
        const notifier = new Notifier('https://example.com/webhook');
        const message = 'hello world';

        await notifier.send({ text: message });

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(fakeIncomingWebhook.prototype.send).toHaveBeenCalledWith({
          text: message
        });
      });
    });

    describe('when the slack webhook has an error', () => {
      let consoleErrorSpy: jest.SpiedFunction<typeof console.error>;

      beforeEach(() => {
        fakeIncomingWebhook.prototype.send.mockImplementationOnce(() => {
          throw new Error('slack webhook failure');
        });
        consoleErrorSpy = jest
          .spyOn(console, 'error')
          .mockImplementation(() => null);
      });

      it('logs the error', async () => {
        const notifier = new Notifier('https://example.com/webhook');

        await notifier.send({ text: 'hello world' });

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Error sending to slack webhook:',
          new Error('slack webhook failure')
        );
      });
    });
  });
});
