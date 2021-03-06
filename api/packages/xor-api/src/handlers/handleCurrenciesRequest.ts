import {NextFunction, Request, Response} from "express";
import {serializeCurrencyList} from "@xor/xor-api-schema";
import {Runtime} from "../Runtime";

export default async function handleCurrenciesRequest(
    runtime: Runtime,
    request: Request,
    response: Response,
    next: NextFunction
) {
    try {
        const client = runtime.getExchangeRatesClient();
        const currencies = await client.getCurrencies();
        response.status(200);
        response.send(serializeCurrencyList({currencies}));
    } catch(e) {
        next(e);
    }
}
