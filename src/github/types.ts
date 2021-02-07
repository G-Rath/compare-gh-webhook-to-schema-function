import {
  WebhookEventMap,
  WebhookEventName
} from '@octokit/webhooks-definitions/schema';

interface EventWithPayload<TName extends WebhookEventName> {
  name: TName;
  payload: WebhookEventMap[TName];
}

type GithubEventsMap = {
  [K in WebhookEventName]: EventWithPayload<K>;
};

type GithubEventName = WebhookEventName;
export type GithubEvent = GithubEventsMap[GithubEventName];

declare module '@azure/functions' {
  export interface HttpRequestHeaders {
    'x-github-event': GithubEventName;
    'x-github-delivery': string;
    'x-hub-signature': string;
    'x-hub-signature-256': string;
  }
}
