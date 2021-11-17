import {ExchangeRates} from "./ExchangeRates";

export default function parseExchangeRates(str: string): ExchangeRates {
    try {
        const json = JSON.parse(str);
        if (typeof json.timestamp !== "number") {
            throw new Error("Timestamp should be a number");
        }

        Object.entries(json.rates).forEach(([currencyCode, rate]) => {
            if (typeof rate !== "number") {
                throw new Error(`${currencyCode} rate should be a number.`);
            }
        });
        return {
            timestamp: json.timestamp,
            rates: json.rates
        } as ExchangeRates;
    } catch(e) {
        throw new Error(`Could not parse rates response from openexchangerates: ${e}`);
    }
}
