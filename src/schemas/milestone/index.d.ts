export * from './closed';
export * from './created';
export * from './deleted';
export * from './edited';
export * from './opened';

import { MilestoneClosedEvent } from './closed';
import { MilestoneCreatedEvent } from './created';
import { MilestoneDeletedEvent } from './deleted';
import { MilestoneEditedEvent } from './edited';
import { MilestoneOpenedEvent } from './opened';

export type MilestoneEvent =
  | MilestoneClosedEvent
  | MilestoneCreatedEvent
  | MilestoneDeletedEvent
  | MilestoneEditedEvent
  | MilestoneOpenedEvent;
