export * from './published';
export * from './updated';

import { RegistryPackagePublishedEvent } from './published';
import { RegistryPackageUpdatedEvent } from './updated';

export type RegistryPackageEvent =
  | RegistryPackagePublishedEvent
  | RegistryPackageUpdatedEvent;
