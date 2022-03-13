export * from './completed';
export * from './in_progress';
export * from './queued';

import { WorkflowJobCompletedEvent } from './completed';
import { WorkflowJobInProgressEvent } from './in_progress';
import { WorkflowJobQueuedEvent } from './queued';

export type WorkflowJobEvent =
  | WorkflowJobCompletedEvent
  | WorkflowJobInProgressEvent
  | WorkflowJobQueuedEvent;
