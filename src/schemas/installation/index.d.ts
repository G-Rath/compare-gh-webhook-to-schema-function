export * from './created';
export * from './deleted';
export * from './new_permissions_accepted';
export * from './suspended';
export * from './unsuspended';

import { InstallationCreatedEvent } from './created';
import { InstallationDeletedEvent } from './deleted';
import { InstallationNewPermissionsAcceptedEvent } from './new_permissions_accepted';
import { InstallationSuspendedEvent } from './suspended';
import { InstallationUnsuspendedEvent } from './unsuspended';

export type InstallationEvent =
  | InstallationCreatedEvent
  | InstallationDeletedEvent
  | InstallationNewPermissionsAcceptedEvent
  | InstallationSuspendedEvent
  | InstallationUnsuspendedEvent;
