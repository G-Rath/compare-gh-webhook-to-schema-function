export * from './added_to_repository';
export * from './created';
export * from './deleted';
export * from './edited';
export * from './removed_from_repository';

import { TeamAddedToRepositoryEvent } from './added_to_repository';
import { TeamCreatedEvent } from './created';
import { TeamDeletedEvent } from './deleted';
import { TeamEditedEvent } from './edited';
import { TeamRemovedFromRepositoryEvent } from './removed_from_repository';

export type TeamEvent =
  | TeamAddedToRepositoryEvent
  | TeamCreatedEvent
  | TeamDeletedEvent
  | TeamEditedEvent
  | TeamRemovedFromRepositoryEvent;
