import {CurrencyMap} from "./CurrencyMap";

export default function parseCurrencyMap(str: string): CurrencyMap {
    try {
        const json = JSON.parse(str);
        Object.entries(json).forEach(([, currencyName]) => {
            if (typeof currencyName !== "string") {
                // throw new Error(`${currencyName} should be a string.`);
            }
        });
        return json as CurrencyMap;
    } catch(e) {
        throw new Error(`Could not parse currencies response from openexchangerates: ${e}`);
    }
}
