import {Rates} from "./Rates";

export interface CurrencyRates {
    baseCurrencyCode: string;
    validUntil: number;
    rates: Rates;
}
