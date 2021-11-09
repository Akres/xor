import {NextFunction, Request, Response} from "express";
import {Runtime} from "../Runtime";

export default async function handleCurrenciesRequest(
    runtime: Runtime,
    request: Request,
    response: Response,
    next: NextFunction
) {
    const client = runtime.getExchangeRatesClient();
    try {
        const currencies = await client.getCurrencies();
        response.status(200);
        response.send(currencies);
    } catch(e) {
        next(e);
    }
}
