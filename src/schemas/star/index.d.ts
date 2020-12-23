export * from './created';
export * from './deleted';

import { StarCreatedEvent } from './created';
import { StarDeletedEvent } from './deleted';

export type StarEvent = StarCreatedEvent | StarDeletedEvent;
