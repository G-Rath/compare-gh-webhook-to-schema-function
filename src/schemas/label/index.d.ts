export * from './created';
export * from './deleted';
export * from './edited';

import { LabelCreatedEvent } from './created';
import { LabelDeletedEvent } from './deleted';
import { LabelEditedEvent } from './edited';

export type LabelEvent =
  | LabelCreatedEvent
  | LabelDeletedEvent
  | LabelEditedEvent;
