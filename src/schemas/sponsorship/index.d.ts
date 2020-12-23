export * from './cancelled';
export * from './created';
export * from './edited';
export * from './pending_cancellation';
export * from './pending_tier_change';
export * from './tier_changed';

import { SponsorshipCancelledEvent } from './cancelled';
import { SponsorshipCreatedEvent } from './created';
import { SponsorshipEditedEvent } from './edited';
import { SponsorshipPendingCancellationEvent } from './pending_cancellation';
import { SponsorshipPendingTierChangeEvent } from './pending_tier_change';
import { SponsorshipTierChangedEvent } from './tier_changed';

export type SponsorshipEvent =
  | SponsorshipCancelledEvent
  | SponsorshipCreatedEvent
  | SponsorshipEditedEvent
  | SponsorshipPendingCancellationEvent
  | SponsorshipPendingTierChangeEvent
  | SponsorshipTierChangedEvent;
