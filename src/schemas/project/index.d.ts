export * from './closed';
export * from './created';
export * from './deleted';
export * from './edited';
export * from './reopened';

import { ProjectClosedEvent } from './closed';
import { ProjectCreatedEvent } from './created';
import { ProjectDeletedEvent } from './deleted';
import { ProjectEditedEvent } from './edited';
import { ProjectReopenedEvent } from './reopened';

export type ProjectEvent =
  | ProjectClosedEvent
  | ProjectCreatedEvent
  | ProjectDeletedEvent
  | ProjectEditedEvent
  | ProjectReopenedEvent;
