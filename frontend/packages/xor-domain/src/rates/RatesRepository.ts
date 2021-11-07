import {Currency} from "./Currency";
import {CurrencyRates} from "./CurrencyRates";

export interface RatesRepository {
    fetchRates(baseCurrency: string): Promise<CurrencyRates>;
    fetchCurrencies(): Promise<Currency[]>;
}
