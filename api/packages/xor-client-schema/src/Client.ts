import {CurrencyRates} from "./CurrencyRates";
import {CurrencyInfo} from "./CurrencyInfo";

export interface Client {
    getExchangeRates(baseCurrency: string): Promise<CurrencyRates>;
    getCurrencies(): CurrencyInfo[];
}
