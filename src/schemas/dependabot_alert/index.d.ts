export * from './created';
export * from './dismissed';
export * from './fixed';
export * from './reintroduced';
export * from './reopened';

import { DependabotAlertCreatedEvent } from './created';
import { DependabotAlertDismissedEvent } from './dismissed';
import { DependabotAlertFixedEvent } from './fixed';
import { DependabotAlertReintroducedEvent } from './reintroduced';
import { DependabotAlertReopenedEvent } from './reopened';

export type DependabotAlertEvent =
  | DependabotAlertCreatedEvent
  | DependabotAlertDismissedEvent
  | DependabotAlertFixedEvent
  | DependabotAlertReintroducedEvent
  | DependabotAlertReopenedEvent;
