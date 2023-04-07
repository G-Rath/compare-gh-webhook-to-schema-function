export * from './completed';
export * from './in_progress';
export * from './requested';

import { WorkflowRunCompletedEvent } from './completed';
import { WorkflowRunInProgressEvent } from './in_progress';
import { WorkflowRunRequestedEvent } from './requested';

export type WorkflowRunEvent =
  | WorkflowRunCompletedEvent
  | WorkflowRunInProgressEvent
  | WorkflowRunRequestedEvent;
