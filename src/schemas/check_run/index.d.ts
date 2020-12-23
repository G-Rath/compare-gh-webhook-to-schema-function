export * from './completed';
export * from './created';
export * from './requested_action';
export * from './rerequested';

import { CheckRunCompletedEvent } from './completed';
import { CheckRunCreatedEvent } from './created';
import { CheckRunRequestedActionEvent } from './requested_action';
import { CheckRunRerequestedEvent } from './rerequested';

export type CheckRunEvent =
  | CheckRunCompletedEvent
  | CheckRunCreatedEvent
  | CheckRunRequestedActionEvent
  | CheckRunRerequestedEvent;
