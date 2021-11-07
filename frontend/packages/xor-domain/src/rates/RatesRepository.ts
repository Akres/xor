import {Currency} from "./Currency";
import {CurrencyAmount} from "./CurrencyAmount";

export interface RatesRepository {
    convert(baseAmount: number, baseCurrency: string, targetCurrencies: string[]): Promise<CurrencyAmount[]>;
    fetchCurrencies(): Promise<Currency[]>;
}
