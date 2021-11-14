import {Runtime} from "../Runtime";
import {NextFunction, Request, Response} from "express";
import {getValidatedConvertQueryParams, serializeCurrencyAmountList} from "@xor/xor-api-schema";
import {Rates} from "@xor/xor-client-schema";

function toConvertedCurrencyAmount(amountFrom: number, targetCurrency: string, ratesFromBaseCurrency: Rates) {
    const rate = ratesFromBaseCurrency[targetCurrency];
    if (!rate) { // rate of 0 doesn't really make sense
        throw new Error(`Unknown currency ${targetCurrency}`);
    }
    return {
        code: targetCurrency,
        amount: amountFrom * rate
    };
}

export default async function handleConvertRequest(
    runtime: Runtime,
    request: Request,
    response: Response,
    next: NextFunction
) {
    try {
        const client = runtime.getExchangeRatesClient();
        const {from, to, amount} = getValidatedConvertQueryParams(request.query);
        const exchangeRatesForBaseCurrency = await client.getExchangeRates(from);
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
    } catch(e) {
        console.log(e);
        next(e);
    }
}
