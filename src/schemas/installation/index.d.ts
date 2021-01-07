export * from './created';
export * from './deleted';
export * from './new_permissions_accepted';

import { InstallationCreatedEvent } from './created';
import { InstallationDeletedEvent } from './deleted';
import { InstallationNewPermissionsAcceptedEvent } from './new_permissions_accepted';

export type InstallationEvent =
  | InstallationCreatedEvent
  | InstallationDeletedEvent
  | InstallationNewPermissionsAcceptedEvent;
