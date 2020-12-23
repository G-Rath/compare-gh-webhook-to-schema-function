export * from './created';
export * from './deleted';
export * from './edited';

import { IssueCommentCreatedEvent } from './created';
import { IssueCommentDeletedEvent } from './deleted';
import { IssueCommentEditedEvent } from './edited';

export type IssueCommentEvent =
  | IssueCommentCreatedEvent
  | IssueCommentDeletedEvent
  | IssueCommentEditedEvent;
