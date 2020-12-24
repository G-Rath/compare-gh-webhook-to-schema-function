export * from './assigned';
export * from './closed';
export * from './edited';
export * from './labeled';
export * from './locked';
export * from './opened';
export * from './ready_for_review';
export * from './reopened';
export * from './review_request_removed';
export * from './review_requested';
export * from './synchronize';
export * from './unassigned';
export * from './unlabeled';
export * from './unlocked';

import { PullRequestAssignedEvent } from './assigned';
import { PullRequestClosedEvent } from './closed';
import { PullRequestEditedEvent } from './edited';
import { PullRequestLabeledEvent } from './labeled';
import { PullRequestLockedEvent } from './locked';
import { PullRequestOpenedEvent } from './opened';
import { PullRequestReadyForReviewEvent } from './ready_for_review';
import { PullRequestReopenedEvent } from './reopened';
import { PullRequestReviewRequestRemovedEvent } from './review_request_removed';
import { PullRequestReviewRequestedEvent } from './review_requested';
import { PullRequestSynchronizeEvent } from './synchronize';
import { PullRequestUnassignedEvent } from './unassigned';
import { PullRequestUnlabeledEvent } from './unlabeled';
import { PullRequestUnlockedEvent } from './unlocked';

export type PullRequestEvent =
  | PullRequestAssignedEvent
  | PullRequestClosedEvent
  | PullRequestEditedEvent
  | PullRequestLabeledEvent
  | PullRequestLockedEvent
  | PullRequestOpenedEvent
  | PullRequestReadyForReviewEvent
  | PullRequestReopenedEvent
  | PullRequestReviewRequestRemovedEvent
  | PullRequestReviewRequestedEvent
  | PullRequestSynchronizeEvent
  | PullRequestUnassignedEvent
  | PullRequestUnlabeledEvent
  | PullRequestUnlockedEvent;
