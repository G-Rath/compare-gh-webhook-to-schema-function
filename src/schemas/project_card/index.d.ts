export * from './converted';
export * from './created';
export * from './deleted';
export * from './edited';
export * from './moved';

import { ProjectCardConvertedEvent } from './converted';
import { ProjectCardCreatedEvent } from './created';
import { ProjectCardDeletedEvent } from './deleted';
import { ProjectCardEditedEvent } from './edited';
import { ProjectCardMovedEvent } from './moved';

export type ProjectCardEvent =
  | ProjectCardConvertedEvent
  | ProjectCardCreatedEvent
  | ProjectCardDeletedEvent
  | ProjectCardEditedEvent
  | ProjectCardMovedEvent;
