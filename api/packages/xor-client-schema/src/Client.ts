import {CurrencyRates} from "./CurrencyRates";
import {Currency} from "@xor/xor-api-schema";

export interface Client {
    getExchangeRates(baseCurrency: string): Promise<CurrencyRates>;
    getCurrencies(): Promise<Currency[]>;
}
