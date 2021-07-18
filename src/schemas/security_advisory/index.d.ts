export * from './performed';
export * from './published';
export * from './updated';
export * from './withdrawn';

import { SecurityAdvisoryPerformedEvent } from './performed';
import { SecurityAdvisoryPublishedEvent } from './published';
import { SecurityAdvisoryUpdatedEvent } from './updated';
import { SecurityAdvisoryWithdrawnEvent } from './withdrawn';

export type SecurityAdvisoryEvent =
  | SecurityAdvisoryPerformedEvent
  | SecurityAdvisoryPublishedEvent
  | SecurityAdvisoryUpdatedEvent
  | SecurityAdvisoryWithdrawnEvent;
