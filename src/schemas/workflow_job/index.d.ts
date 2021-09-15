export * from './completed';
export * from './queued';
export * from './started';

import { WorkflowJobCompletedEvent } from './completed';
import { WorkflowJobQueuedEvent } from './queued';
import { WorkflowJobStartedEvent } from './started';

export type WorkflowJobEvent =
  | WorkflowJobCompletedEvent
  | WorkflowJobQueuedEvent
  | WorkflowJobStartedEvent;
