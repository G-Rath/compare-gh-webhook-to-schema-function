export * from './completed';
export * from './requested';

import { WorkflowRunCompletedEvent } from './completed';
import { WorkflowRunRequestedEvent } from './requested';

export type WorkflowRunEvent =
  | WorkflowRunCompletedEvent
  | WorkflowRunRequestedEvent;
