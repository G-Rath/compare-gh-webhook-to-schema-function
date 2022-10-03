export * from './assigned';
export * from './auto_merge_disabled';
export * from './auto_merge_enabled';
export * from './closed';
export * from './converted_to_draft';
export * from './dequeued';
export * from './edited';
export * from './labeled';
export * from './locked';
export * from './opened';
export * from './queued';
export * from './ready_for_review';
export * from './reopened';
export * from './review_request_removed';
export * from './review_requested';
export * from './synchronize';
export * from './unassigned';
export * from './unlabeled';
export * from './unlocked';

import { PullRequestAssignedEvent } from './assigned';
import { PullRequestAutoMergeDisabledEvent } from './auto_merge_disabled';
import { PullRequestAutoMergeEnabledEvent } from './auto_merge_enabled';
import { PullRequestClosedEvent } from './closed';
import { PullRequestConvertedToDraftEvent } from './converted_to_draft';
import { PullRequestDequeuedEvent } from './dequeued';
import { PullRequestEditedEvent } from './edited';
import { PullRequestLabeledEvent } from './labeled';
import { PullRequestLockedEvent } from './locked';
import { PullRequestOpenedEvent } from './opened';
import { PullRequestQueuedEvent } from './queued';
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
  | PullRequestAutoMergeDisabledEvent
  | PullRequestAutoMergeEnabledEvent
  | PullRequestClosedEvent
  | PullRequestConvertedToDraftEvent
  | PullRequestDequeuedEvent
  | PullRequestEditedEvent
  | PullRequestLabeledEvent
  | PullRequestLockedEvent
  | PullRequestOpenedEvent
  | PullRequestQueuedEvent
  | PullRequestReadyForReviewEvent
  | PullRequestReopenedEvent
  | PullRequestReviewRequestRemovedEvent
  | PullRequestReviewRequestedEvent
  | PullRequestSynchronizeEvent
  | PullRequestUnassignedEvent
  | PullRequestUnlabeledEvent
  | PullRequestUnlockedEvent;
