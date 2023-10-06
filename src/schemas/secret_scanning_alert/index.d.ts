export * from './created';
export * from './reopened';
export * from './resolved';
export * from './revoked';

import { SecretScanningAlertCreatedEvent } from './created';
import { SecretScanningAlertReopenedEvent } from './reopened';
import { SecretScanningAlertResolvedEvent } from './resolved';
import { SecretScanningAlertRevokedEvent } from './revoked';

export type SecretScanningAlertEvent =
  | SecretScanningAlertCreatedEvent
  | SecretScanningAlertReopenedEvent
  | SecretScanningAlertResolvedEvent
  | SecretScanningAlertRevokedEvent;
