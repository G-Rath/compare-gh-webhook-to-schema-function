export * from './dismissed';
export * from './edited';
export * from './submitted';

import { PullRequestReviewDismissedEvent } from './dismissed';
import { PullRequestReviewEditedEvent } from './edited';
import { PullRequestReviewSubmittedEvent } from './submitted';

export type PullRequestReviewEvent =
  | PullRequestReviewDismissedEvent
  | PullRequestReviewEditedEvent
  | PullRequestReviewSubmittedEvent;
