export * from './added';
export * from './removed';

import { InstallationRepositoriesAddedEvent } from './added';
import { InstallationRepositoriesRemovedEvent } from './removed';

export type InstallationRepositoriesEvent =
  | InstallationRepositoriesAddedEvent
  | InstallationRepositoriesRemovedEvent;
