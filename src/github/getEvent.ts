import { HttpRequest } from '@azure/functions';
import { verify } from '@octokit/webhooks-methods';
import { GithubEvent } from './types';

declare global {
  export namespace NodeJS {
    export interface ProcessEnv {
      GH_WEBHOOK_SECRET: string;
    }
  }
}

export const getEvent = async (request: HttpRequest): Promise<GithubEvent> => {
  const rawBody = request.rawBody as string;
  const signature: string = request.headers['x-hub-signature-256'];
  const { GH_WEBHOOK_SECRET } = process.env;

  if (await verify(GH_WEBHOOK_SECRET, rawBody, signature)) {
    // ensure we're referencing a header that is defined, outside of the cast
    const name = request.headers['x-github-event'];
    const payload = JSON.parse(rawBody) as GithubEvent['payload'];

    return { name, payload } as GithubEvent;
  }

  throw new Error('event did not come from github');
};
