import { HttpRequest } from '@azure/functions';
import { verify } from '@octokit/webhooks';
import { GithubEvent } from './types';

declare global {
  export namespace NodeJS {
    export interface ProcessEnv {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      GITHUB_WEBHOOK_SECRET: string;
    }
  }
}

export const getEvent = (request: HttpRequest): GithubEvent => {
  const rawBody = (request.rawBody as string) || '{}';
  const signature: string = request.headers['x-hub-signature'];
  const { GITHUB_WEBHOOK_SECRET } = process.env;

  if (verify(GITHUB_WEBHOOK_SECRET, rawBody, signature)) {
    // ensure we're referencing a header that is defined, outside of the cast
    const name: GithubEvent['name'] = request.headers['x-github-event'];
    const payload = JSON.parse(rawBody) as Record<string, unknown>;

    return { name, payload } as GithubEvent;
  }

  throw new Error('event did not come from github');
};
