export * from './performed';
export * from './published';
export * from './updated';

import { SecurityAdvisoryPerformedEvent } from './performed';
import { SecurityAdvisoryPublishedEvent } from './published';
import { SecurityAdvisoryUpdatedEvent } from './updated';

export type SecurityAdvisoryEvent =
  | SecurityAdvisoryPerformedEvent
  | SecurityAdvisoryPublishedEvent
  | SecurityAdvisoryUpdatedEvent;
