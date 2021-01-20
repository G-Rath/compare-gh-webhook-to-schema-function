export * from './cancelled';
export * from './changed';
export * from './pending_change';
export * from './pending_change_cancelled';
export * from './purchased';

import { MarketplacePurchaseCancelledEvent } from './cancelled';
import { MarketplacePurchaseChangedEvent } from './changed';
import { MarketplacePurchasePendingChangeEvent } from './pending_change';
import { MarketplacePurchasePendingChangeCancelledEvent } from './pending_change_cancelled';
import { MarketplacePurchasePurchasedEvent } from './purchased';

export type MarketplacePurchaseEvent =
  | MarketplacePurchaseCancelledEvent
  | MarketplacePurchaseChangedEvent
  | MarketplacePurchasePendingChangeEvent
  | MarketplacePurchasePendingChangeCancelledEvent
  | MarketplacePurchasePurchasedEvent;
