import {CurrencyAmount} from "@xor/xor-api-schema";
import {ExchangeItem} from "./ExchangeItem";

export interface ExchangeState {
    baseCurrencyAmount: CurrencyAmount;
    targetItems: ExchangeItem[];
}
