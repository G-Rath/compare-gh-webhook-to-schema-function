export * from './approved';
export * from './rejected';
export * from './requested';

import { DeploymentReviewApprovedEvent } from './approved';
import { DeploymentReviewRejectedEvent } from './rejected';
import { DeploymentReviewRequestedEvent } from './requested';

export type DeploymentReviewEvent =
  | DeploymentReviewApprovedEvent
  | DeploymentReviewRejectedEvent
  | DeploymentReviewRequestedEvent;
