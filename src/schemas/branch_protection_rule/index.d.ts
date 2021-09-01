export * from './created';
export * from './deleted';
export * from './edited';

import { BranchProtectionRuleCreatedEvent } from './created';
import { BranchProtectionRuleDeletedEvent } from './deleted';
import { BranchProtectionRuleEditedEvent } from './edited';

export type BranchProtectionRuleEvent =
  | BranchProtectionRuleCreatedEvent
  | BranchProtectionRuleDeletedEvent
  | BranchProtectionRuleEditedEvent;
