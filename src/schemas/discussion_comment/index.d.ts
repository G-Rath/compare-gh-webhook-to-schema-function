export * from './created';
export * from './deleted';
export * from './edited';

import { DiscussionCommentCreatedEvent } from './created';
import { DiscussionCommentDeletedEvent } from './deleted';
import { DiscussionCommentEditedEvent } from './edited';

export type DiscussionCommentEvent =
  | DiscussionCommentCreatedEvent
  | DiscussionCommentDeletedEvent
  | DiscussionCommentEditedEvent;
