export * from './answered';
export * from './category_changed';
export * from './created';
export * from './deleted';
export * from './edited';
export * from './labeled';
export * from './locked';
export * from './pinned';
export * from './transferred';
export * from './unanswered';
export * from './unlabeled';
export * from './unlocked';
export * from './unpinned';

import { DiscussionAnsweredEvent } from './answered';
import { DiscussionCategoryChangedEvent } from './category_changed';
import { DiscussionCreatedEvent } from './created';
import { DiscussionDeletedEvent } from './deleted';
import { DiscussionEditedEvent } from './edited';
import { DiscussionLabeledEvent } from './labeled';
import { DiscussionLockedEvent } from './locked';
import { DiscussionPinnedEvent } from './pinned';
import { DiscussionTransferredEvent } from './transferred';
import { DiscussionUnansweredEvent } from './unanswered';
import { DiscussionUnlabeledEvent } from './unlabeled';
import { DiscussionUnlockedEvent } from './unlocked';
import { DiscussionUnpinnedEvent } from './unpinned';

export type DiscussionEvent =
  | DiscussionAnsweredEvent
  | DiscussionCategoryChangedEvent
  | DiscussionCreatedEvent
  | DiscussionDeletedEvent
  | DiscussionEditedEvent
  | DiscussionLabeledEvent
  | DiscussionLockedEvent
  | DiscussionPinnedEvent
  | DiscussionTransferredEvent
  | DiscussionUnansweredEvent
  | DiscussionUnlabeledEvent
  | DiscussionUnlockedEvent
  | DiscussionUnpinnedEvent;
