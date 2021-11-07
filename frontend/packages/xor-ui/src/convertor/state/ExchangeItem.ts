import {CurrencyAmount} from "@xor/xor-domain";

export interface ExchangeItem {
    currencyAmount: CurrencyAmount;
    isLoading: boolean;
}
