export * from './created';
export * from './deleted';
export * from './edited';
export * from './prereleased';
export * from './published';
export * from './released';
export * from './unpublished';

import { ReleaseCreatedEvent } from './created';
import { ReleaseDeletedEvent } from './deleted';
import { ReleaseEditedEvent } from './edited';
import { ReleasePrereleasedEvent } from './prereleased';
import { ReleasePublishedEvent } from './published';
import { ReleaseReleasedEvent } from './released';
import { ReleaseUnpublishedEvent } from './unpublished';

export type ReleaseEvent =
  | ReleaseCreatedEvent
  | ReleaseDeletedEvent
  | ReleaseEditedEvent
  | ReleasePrereleasedEvent
  | ReleasePublishedEvent
  | ReleaseReleasedEvent
  | ReleaseUnpublishedEvent;
