import { HttpRequest } from '@azure/functions';
import { sign } from '@octokit/webhooks';
import { GithubEvent, getEvent } from '../../../src/github';
import pingEvent from '../../fixtures/ping.json';

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
  beforeEach(() => (process.env.GITHUB_WEBHOOK_SECRET = 'mysecret'));

  describe('when the secret is missing from the env', () => {
    beforeEach(() => (process.env.GITHUB_WEBHOOK_SECRET = ''));

    it('throws', () => {
      const request = buildHttpRequest({ name: 'ping', payload: pingEvent });

      expect(() => getEvent(request)).toThrowErrorMatchingInlineSnapshot(
        `"[@octokit/webhooks] secret, eventPayload & signature required"`
      );
    });
  });

  describe('when the signature is empty', () => {
    it('throws', () => {
      const request = buildHttpRequest({ name: 'ping', payload: pingEvent });

      request.headers['x-hub-signature-256'] = '';

      expect(() => getEvent(request)).toThrowErrorMatchingInlineSnapshot(
        `"[@octokit/webhooks] secret, eventPayload & signature required"`
      );
    });
  });

  describe('when the signature is correct', () => {
    it('does not throw', () => {
      const request = buildHttpRequest({ name: 'ping', payload: pingEvent });

      expect(() => getEvent(request)).not.toThrow();
    });

    it('returns the parsed body', () => {
      const ghEvent: GithubEvent = { name: 'ping', payload: pingEvent };
      const request = buildHttpRequest(ghEvent);

      expect(getEvent(request)).toStrictEqual(ghEvent);
    });
  });

  describe('when the signature is incorrect', () => {
    it('throws', () => {
      const request = buildHttpRequest(
        { name: 'ping', payload: pingEvent },
        'wrong'
      );

      expect(() => getEvent(request)).toThrowErrorMatchingInlineSnapshot(
        `"event did not come from github"`
      );
    });
  });
});
