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
        validUntil: Math.floor(new Date().getTime() / 1000),
        rates: Object.fromEntries(
            Object
                .entries(exchangeRatesUsd.rates)
                .map(([code, rate]) => [code, rate / usdToTargetRate])
        )

    };

}

export default function getExchangeRates(baseCurrency: string): Promise<CurrencyRates> {
    return Promise.resolve(recalculateRates(baseCurrency));
}
