import { PingEvent } from '@octokit/webhooks-types';
import pingEvent from './ping.json';

// we have to typecast all the json imports as they're not imported with const,
// meaning TypeScript complains about enum values not being assignable to strings
// @see https://github.com/microsoft/TypeScript/issues/32063

export const pingEventPayload = pingEvent as PingEvent;
