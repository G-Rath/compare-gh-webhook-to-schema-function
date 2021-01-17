export * from './created';
export * from './deleted';
export * from './edited';

import { PullRequestReviewCommentCreatedEvent } from './created';
import { PullRequestReviewCommentDeletedEvent } from './deleted';
import { PullRequestReviewCommentEditedEvent } from './edited';

export type PullRequestReviewCommentEvent =
  | PullRequestReviewCommentCreatedEvent
  | PullRequestReviewCommentDeletedEvent
  | PullRequestReviewCommentEditedEvent;
