export * from './resolved';
export * from './unresolved';

import { PullRequestReviewThreadResolvedEvent } from './resolved';
import { PullRequestReviewThreadUnresolvedEvent } from './unresolved';

export type PullRequestReviewThreadEvent =
  | PullRequestReviewThreadResolvedEvent
  | PullRequestReviewThreadUnresolvedEvent;
