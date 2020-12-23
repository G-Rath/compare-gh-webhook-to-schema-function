export * from './assigned';
export * from './closed';
export * from './deleted';
export * from './demilestoned';
export * from './edited';
export * from './labeled';
export * from './locked';
export * from './milestoned';
export * from './opened';
export * from './pinned';
export * from './reopened';
export * from './transferred';
export * from './unassigned';
export * from './unlabeled';
export * from './unlocked';
export * from './unpinned';

import { IssuesAssignedEvent } from './assigned';
import { IssuesClosedEvent } from './closed';
import { IssuesDeletedEvent } from './deleted';
import { IssuesDemilestonedEvent } from './demilestoned';
import { IssuesEditedEvent } from './edited';
import { IssuesLabeledEvent } from './labeled';
import { IssuesLockedEvent } from './locked';
import { IssuesMilestonedEvent } from './milestoned';
import { IssuesOpenedEvent } from './opened';
import { IssuesPinnedEvent } from './pinned';
import { IssuesReopenedEvent } from './reopened';
import { IssuesTransferredEvent } from './transferred';
import { IssuesUnassignedEvent } from './unassigned';
import { IssuesUnlabeledEvent } from './unlabeled';
import { IssuesUnlockedEvent } from './unlocked';
import { IssuesUnpinnedEvent } from './unpinned';

export type IssuesEvent =
  | IssuesAssignedEvent
  | IssuesClosedEvent
  | IssuesDeletedEvent
  | IssuesDemilestonedEvent
  | IssuesEditedEvent
  | IssuesLabeledEvent
  | IssuesLockedEvent
  | IssuesMilestonedEvent
  | IssuesOpenedEvent
  | IssuesPinnedEvent
  | IssuesReopenedEvent
  | IssuesTransferredEvent
  | IssuesUnassignedEvent
  | IssuesUnlabeledEvent
  | IssuesUnlockedEvent
  | IssuesUnpinnedEvent;
