export * from './published';
export * from './updated';

import { PackagePublishedEvent } from './published';
import { PackageUpdatedEvent } from './updated';

export type PackageEvent = PackagePublishedEvent | PackageUpdatedEvent;
