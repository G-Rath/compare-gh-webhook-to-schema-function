export * from './cancelled';
export * from './changed';
export * from './purchased';

import { MarketplacePurchaseCancelledEvent } from './cancelled';
import { MarketplacePurchaseChangedEvent } from './changed';
import { MarketplacePurchasePurchasedEvent } from './purchased';

export type MarketplacePurchaseEvent =
  | MarketplacePurchaseCancelledEvent
  | MarketplacePurchaseChangedEvent
  | MarketplacePurchasePurchasedEvent;
