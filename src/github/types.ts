import { EventTypesPayload, WebhookEvents } from '@octokit/webhooks';

type WebhookEventName = Exclude<
  WebhookEvents,
  `${string}.${string}` | 'errors' | '*'
>;

type HasPayload<
  TName extends WebhookEventName
> = EventTypesPayload[TName] extends { payload: unknown }
  ? TName //
  : never;

type PayloadAndName<TEventName extends WebhookEventName> = Omit<
  EventTypesPayload[TEventName],
  'id' | 'name'
> & { name: TEventName };

type PayloadsWithNames = {
  [K in WebhookEventName as HasPayload<K>]: PayloadAndName<K>;
};

type ActionsForEvent<
  TName extends WebhookEventName,
  TActions = Extract<WebhookEvents, `${TName}.${string}`>
> = TActions extends `${TName}.${infer TAction}`
  ? TAction //
  : never;

type WithAction<
  TEvent extends { payload: unknown; name: WebhookEventName }
> = TEvent extends { payload: { action: string } }
  ? TEvent & { payload: { action: ActionsForEvent<TEvent['name']> } }
  : TEvent;

type GithubEventsMap = {
  [K in keyof PayloadsWithNames]: WithAction<PayloadsWithNames[K]>;
};

type GithubEventName = keyof GithubEventsMap;
export type GithubEvent = GithubEventsMap[GithubEventName];

declare module '@azure/functions' {
  export interface HttpRequestHeaders {
    'x-github-event': GithubEventName;
    'x-github-delivery': string;
    'x-hub-signature': string;
    'x-hub-signature-256': string;
  }
}
