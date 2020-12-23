export * from './archived';
export * from './created';
export * from './deleted';
export * from './edited';
export * from './privatized';
export * from './publicized';
export * from './renamed';
export * from './transferred';
export * from './unarchived';

import { RepositoryArchivedEvent } from './archived';
import { RepositoryCreatedEvent } from './created';
import { RepositoryDeletedEvent } from './deleted';
import { RepositoryEditedEvent } from './edited';
import { RepositoryPrivatizedEvent } from './privatized';
import { RepositoryPublicizedEvent } from './publicized';
import { RepositoryRenamedEvent } from './renamed';
import { RepositoryTransferredEvent } from './transferred';
import { RepositoryUnarchivedEvent } from './unarchived';

export type RepositoryEvent =
  | RepositoryArchivedEvent
  | RepositoryCreatedEvent
  | RepositoryDeletedEvent
  | RepositoryEditedEvent
  | RepositoryPrivatizedEvent
  | RepositoryPublicizedEvent
  | RepositoryRenamedEvent
  | RepositoryTransferredEvent
  | RepositoryUnarchivedEvent;
