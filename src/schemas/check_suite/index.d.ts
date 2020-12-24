export * from './completed';
export * from './requested';
export * from './rerequested';

import { CheckSuiteCompletedEvent } from './completed';
import { CheckSuiteRequestedEvent } from './requested';
import { CheckSuiteRerequestedEvent } from './rerequested';

export type CheckSuiteEvent =
  | CheckSuiteCompletedEvent
  | CheckSuiteRequestedEvent
  | CheckSuiteRerequestedEvent;
