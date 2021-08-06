export * from './completed';
export * from './started';

import { WorkflowJobCompletedEvent } from './completed';
import { WorkflowJobStartedEvent } from './started';

export type WorkflowJobEvent =
  | WorkflowJobCompletedEvent
  | WorkflowJobStartedEvent;
