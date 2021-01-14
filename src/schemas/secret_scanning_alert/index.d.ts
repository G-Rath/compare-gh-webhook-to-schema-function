export * from './created';
export * from './reopened';
export * from './resolved';

import { SecretScanningAlertCreatedEvent } from './created';
import { SecretScanningAlertReopenedEvent } from './reopened';
import { SecretScanningAlertResolvedEvent } from './resolved';

export type SecretScanningAlertEvent =
  | SecretScanningAlertCreatedEvent
  | SecretScanningAlertReopenedEvent
  | SecretScanningAlertResolvedEvent;
