import {CurrencyRates} from "@xor/xor-client-domain";
import exchangeRatesUsd from "./exchangeRatesUsd.json";

function recalculateRates(targetCurrency: string): CurrencyRates {
    const targetValueRatePair = Object
        .entries(exchangeRatesUsd.rates)
        .find((o) => o && o[0] === targetCurrency);
    if (!targetValueRatePair) {
        throw new Error(`Currency ${targetCurrency} not found`);
    }

    const usdToTargetRate = targetValueRatePair[1];

    return {
        baseCurrency: targetCurrency,
        validUntil: Date.now() + 10 * 1000, // Validity of 10 seconds for testing
        rates: Object.fromEntries(
            Object
                .entries(exchangeRatesUsd.rates)
                .map(([code, rate]) => [code, rate / usdToTargetRate])
        )

    };

}

export default function getExchangeRates(baseCurrency: string): Promise<CurrencyRates> {
    console.log(`Fetching exchange rates for ${baseCurrency} from service.`);
    return Promise.resolve(recalculateRates(baseCurrency));
}
