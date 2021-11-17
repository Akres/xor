import {Axios} from "axios";
import {CurrencyRates} from "@xor/xor-client-domain";

function recalculateRates(usdExchangeRates: CurrencyRates, targetCurrency: string): CurrencyRates {
    const targetValueRatePair = Object
        .entries(usdExchangeRates.rates)
        .find((o) => o && o[0] === targetCurrency);
    if (!targetValueRatePair) {
        throw new Error(`Currency ${targetCurrency} not found`);
    }

    const usdToTargetRate = targetValueRatePair[1];

    return {
        baseCurrency: targetCurrency,
        validUntil: usdExchangeRates.validUntil,
        rates: Object.fromEntries(
            Object
                .entries(usdExchangeRates.rates)
                .map(([code, rate]) => [code, rate / usdToTargetRate])
        )

    };

}

export default async function getExchangeRates(
    apiClient: Axios,
    getUsdRates: (apiClient: Axios) => Promise<CurrencyRates>,
    baseCurrency: string
): Promise<CurrencyRates> {
    const usdExchangeRates = await getUsdRates(apiClient);
    // The free plan only has USD as base currency, so we need to recalculate.
    return recalculateRates(usdExchangeRates, baseCurrency);
}
