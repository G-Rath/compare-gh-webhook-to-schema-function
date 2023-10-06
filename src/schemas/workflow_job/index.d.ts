export * from './completed';
export * from './in_progress';
export * from './queued';
export * from './waiting';

import { WorkflowJobCompletedEvent } from './completed';
import { WorkflowJobInProgressEvent } from './in_progress';
import { WorkflowJobQueuedEvent } from './queued';
import { WorkflowJobWaitingEvent } from './waiting';

export type WorkflowJobEvent =
  | WorkflowJobCompletedEvent
  | WorkflowJobInProgressEvent
  | WorkflowJobQueuedEvent
  | WorkflowJobWaitingEvent;
