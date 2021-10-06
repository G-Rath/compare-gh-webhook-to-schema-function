export * from './completed';
export * from './in_progress';
export * from './queued';
export * from './started';

import { WorkflowJobCompletedEvent } from './completed';
import { WorkflowJobInProgressEvent } from './in_progress';
import { WorkflowJobQueuedEvent } from './queued';
import { WorkflowJobStartedEvent } from './started';

export type WorkflowJobEvent =
  | WorkflowJobCompletedEvent
  | WorkflowJobInProgressEvent
  | WorkflowJobQueuedEvent
  | WorkflowJobStartedEvent;
