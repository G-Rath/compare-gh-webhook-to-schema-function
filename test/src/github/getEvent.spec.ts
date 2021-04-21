import { HttpRequest } from '@azure/functions';
import { sign } from '@octokit/webhooks-methods';
import { GithubEvent, getEvent } from '../../../src/github';
import { pingEventPayload } from '../../fixtures';

const buildHttpRequest = (
  event: GithubEvent,
  secret = 'mysecret'
): HttpRequest => {
  const rawBody = JSON.stringify(event.payload);

  return {
    method: 'POST',
    params: {},
    query: {},
    url: 'https://mysite.com',
    headers: {
      'x-github-event': event.name,
      'x-github-delivery': 'hello world',
      'x-hub-signature': sign({ secret, algorithm: 'sha1' }, rawBody),
      'x-hub-signature-256': sign({ secret, algorithm: 'sha256' }, rawBody)
    },
    rawBody
  };
};

describe('getEvent', () => {
  beforeEach(() => (process.env.GH_WEBHOOK_SECRET = 'mysecret'));

  describe('when the secret is missing from the env', () => {
    beforeEach(() => (process.env.GH_WEBHOOK_SECRET = ''));

    it('throws', async () => {
      const request = buildHttpRequest({
        name: 'ping',
        payload: pingEventPayload
      });

      await expect(
        getEvent(request)
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"[@octokit/webhooks-methods] secret, eventPayload & signature required"`
      );
    });
  });

  describe('when the signature is empty', () => {
    it('throws', async () => {
      const request = buildHttpRequest({
        name: 'ping',
        payload: pingEventPayload
      });

      request.headers['x-hub-signature-256'] = '';

      await expect(
        getEvent(request)
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"[@octokit/webhooks-methods] secret, eventPayload & signature required"`
      );
    });
  });

  describe('when the signature is correct', () => {
    it('does not throw', async () => {
      const request = buildHttpRequest({
        name: 'ping',
        payload: pingEventPayload
      });

      await expect(getEvent(request)).resolves.not.toThrow();
    });

    it('returns the parsed body', async () => {
      const ghEvent: GithubEvent = { name: 'ping', payload: pingEventPayload };
      const request = buildHttpRequest(ghEvent);

      await expect(getEvent(request)).resolves.toStrictEqual(ghEvent);
    });
  });

  describe('when the signature is incorrect', () => {
    it('throws', async () => {
      const request = buildHttpRequest(
        { name: 'ping', payload: pingEventPayload },
        'wrong'
      );

      await expect(
        getEvent(request)
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"event did not come from github"`
      );
    });
  });
});
