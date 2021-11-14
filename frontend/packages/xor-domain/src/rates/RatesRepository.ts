import {CurrencyAmount} from "./CurrencyAmount";
import {Currency} from "@xor/xor-api-schema";

export interface RatesRepository {
    convert(baseAmount: number, baseCurrency: string, targetCurrencies: string[]): Promise<CurrencyAmount[]>;
    fetchCurrencies(): Promise<Currency[]>;
}
