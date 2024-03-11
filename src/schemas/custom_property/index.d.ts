export * from './created';
export * from './deleted';

import { CustomPropertyCreatedEvent } from './created';
import { CustomPropertyDeletedEvent } from './deleted';

export type CustomPropertyEvent =
  | CustomPropertyCreatedEvent
  | CustomPropertyDeletedEvent;
