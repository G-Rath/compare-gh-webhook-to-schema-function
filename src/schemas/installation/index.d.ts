export * from './created';
export * from './deleted';
export * from './new_permissions_accepted';
export * from './suspend';
export * from './unsuspend';

import { InstallationCreatedEvent } from './created';
import { InstallationDeletedEvent } from './deleted';
import { InstallationNewPermissionsAcceptedEvent } from './new_permissions_accepted';
import { InstallationSuspendEvent } from './suspend';
import { InstallationUnsuspendEvent } from './unsuspend';

export type InstallationEvent =
  | InstallationCreatedEvent
  | InstallationDeletedEvent
  | InstallationNewPermissionsAcceptedEvent
  | InstallationSuspendEvent
  | InstallationUnsuspendEvent;
