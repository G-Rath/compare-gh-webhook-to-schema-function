export * from './added';
export * from './removed';

import { MembershipAddedEvent } from './added';
import { MembershipRemovedEvent } from './removed';

export type MembershipEvent = MembershipAddedEvent | MembershipRemovedEvent;
