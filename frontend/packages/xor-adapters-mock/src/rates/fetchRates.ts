import {CurrencyRates} from "@xor/xor-domain";

export default async function fetchRates(baseCurrencyCode: string): Promise<CurrencyRates> {
    return {
        baseCurrencyCode,
        validUntil: Math.floor(Date.now() / 1000) + 1000,
        rates: {
            EUR: 1.233,
            USD: 0.678,
            CZK: 12.40,
            JPY: 532.355
        }
    };
}
