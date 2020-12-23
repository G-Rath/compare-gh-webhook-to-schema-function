export * from './blocked';
export * from './unblocked';

import { OrgBlockBlockedEvent } from './blocked';
import { OrgBlockUnblockedEvent } from './unblocked';

export type OrgBlockEvent = OrgBlockBlockedEvent | OrgBlockUnblockedEvent;
