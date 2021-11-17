import {Rates} from "./Rates";

export interface CurrencyRates {
    baseCurrency: string; // 3-letter code
    rates: Rates;
    validUntil: number; // UNIX timestamp of rates validity IN MILLISECONDS
}
