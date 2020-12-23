export * from './appeared_in_branch';
export * from './closed_by_user';
export * from './created';
export * from './fixed';
export * from './reopened';
export * from './reopened_by_user';

import { CodeScanningAlertAppearedInBranchEvent } from './appeared_in_branch';
import { CodeScanningAlertClosedByUserEvent } from './closed_by_user';
import { CodeScanningAlertCreatedEvent } from './created';
import { CodeScanningAlertFixedEvent } from './fixed';
import { CodeScanningAlertReopenedEvent } from './reopened';
import { CodeScanningAlertReopenedByUserEvent } from './reopened_by_user';

export type CodeScanningAlertEvent =
  | CodeScanningAlertAppearedInBranchEvent
  | CodeScanningAlertClosedByUserEvent
  | CodeScanningAlertCreatedEvent
  | CodeScanningAlertFixedEvent
  | CodeScanningAlertReopenedEvent
  | CodeScanningAlertReopenedByUserEvent;
