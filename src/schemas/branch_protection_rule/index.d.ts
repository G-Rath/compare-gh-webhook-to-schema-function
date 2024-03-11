export * from './created';
export * from './deleted';
export * from './disabled';
export * from './edited';
export * from './enabled';

import { BranchProtectionRuleCreatedEvent } from './created';
import { BranchProtectionRuleDeletedEvent } from './deleted';
import { BranchProtectionRuleDisabledEvent } from './disabled';
import { BranchProtectionRuleEditedEvent } from './edited';
import { BranchProtectionRuleEnabledEvent } from './enabled';

export type BranchProtectionRuleEvent =
  | BranchProtectionRuleCreatedEvent
  | BranchProtectionRuleDeletedEvent
  | BranchProtectionRuleDisabledEvent
  | BranchProtectionRuleEditedEvent
  | BranchProtectionRuleEnabledEvent;
