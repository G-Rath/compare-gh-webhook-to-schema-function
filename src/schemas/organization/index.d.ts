export * from './deleted';
export * from './member_added';
export * from './member_invited';
export * from './member_removed';
export * from './renamed';

import { OrganizationDeletedEvent } from './deleted';
import { OrganizationMemberAddedEvent } from './member_added';
import { OrganizationMemberInvitedEvent } from './member_invited';
import { OrganizationMemberRemovedEvent } from './member_removed';
import { OrganizationRenamedEvent } from './renamed';

export type OrganizationEvent =
  | OrganizationDeletedEvent
  | OrganizationMemberAddedEvent
  | OrganizationMemberInvitedEvent
  | OrganizationMemberRemovedEvent
  | OrganizationRenamedEvent;
