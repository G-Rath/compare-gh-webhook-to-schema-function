export * from './created';
export * from './deleted';
export * from './edited';
export * from './moved';

import { ProjectColumnCreatedEvent } from './created';
import { ProjectColumnDeletedEvent } from './deleted';
import { ProjectColumnEditedEvent } from './edited';
import { ProjectColumnMovedEvent } from './moved';

export type ProjectColumnEvent =
  | ProjectColumnCreatedEvent
  | ProjectColumnDeletedEvent
  | ProjectColumnEditedEvent
  | ProjectColumnMovedEvent;
