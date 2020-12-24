export * from './added';
export * from './edited';
export * from './removed';

import { MemberAddedEvent } from './added';
import { MemberEditedEvent } from './edited';
import { MemberRemovedEvent } from './removed';

export type MemberEvent =
  | MemberAddedEvent
  | MemberEditedEvent
  | MemberRemovedEvent;
