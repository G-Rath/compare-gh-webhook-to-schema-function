export * from './created';
export * from './deleted';

import { InstallationCreatedEvent } from './created';
import { InstallationDeletedEvent } from './deleted';

export type InstallationEvent =
  | InstallationCreatedEvent
  | InstallationDeletedEvent;
