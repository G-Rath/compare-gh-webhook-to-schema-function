export * from './created';
export * from './deleted';

import { DeployKeyCreatedEvent } from './created';
import { DeployKeyDeletedEvent } from './deleted';

export type DeployKeyEvent = DeployKeyCreatedEvent | DeployKeyDeletedEvent;
