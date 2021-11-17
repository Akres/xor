import {Runtime} from "../Runtime";
import {NextFunction, Request, Response} from "express";
import {getValidatedConvertQueryParams, serializeCurrencyAmountList} from "@xor/xor-api-schema";
import {Rates} from "@xor/xor-client-domain";
import {ConversionLog} from "@xor/xor-stats-client-domain";

function convert(amountFrom: number, targetCurrency: string, ratesFromBaseCurrency: Rates) {
    const rate = ratesFromBaseCurrency[targetCurrency];
    if (!rate) { // rate of 0 doesn't really make sense
        throw new Error(`Unknown currency ${targetCurrency}`);
    }

    return amountFrom * rate;
}

function toConvertedCurrencyAmount(amountFrom: number, targetCurrency: string, ratesFromBaseCurrency: Rates) {
    const amount = convert(amountFrom, targetCurrency, ratesFromBaseCurrency);
    return {
        code: targetCurrency,
        amount: amount
    };
}

export default async function handleConvertRequest(
    runtime: Runtime,
    request: Request,
    response: Response,
    next: NextFunction
) {
    try {
        const ratesClient = runtime.getExchangeRatesClient();
        const {from, to, amount} = getValidatedConvertQueryParams(request.query);
        const exchangeRatesForBaseCurrency = await ratesClient.getExchangeRates(from);
        response.send(
            serializeCurrencyAmountList({
                amounts: to.map((targetCurrencyCode) =>
                    toConvertedCurrencyAmount(
                        amount,
                        targetCurrencyCode,
                        exchangeRatesForBaseCurrency.rates
                    )
                )
            })
        );

        const statsClient = runtime.getStatsClient();
        const usdAmount = convert(amount, "USD", exchangeRatesForBaseCurrency.rates);
        const logs: ConversionLog[] = to.map((targetCurrencyCode) => ({
            targetCurrencyCode,
            totalUsd: usdAmount
        }));
        console.log("Logging", logs);
        await statsClient.logConversions(logs);

    } catch(e) {
        console.log(e);
        next(e);
    }
}
