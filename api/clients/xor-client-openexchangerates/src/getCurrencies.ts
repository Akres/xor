import {Currency} from "@xor/xor-client-domain";
import {Axios} from "axios";
import parseCurrencyMap from "./schema/parseCurrencyMap";
import {CurrencyMap} from "./schema/CurrencyMap";

function toCurrencyList(currencyMap: CurrencyMap): Currency[] {
    return Object.entries(currencyMap).map(([code, name]) => ({code, name}));
}

export default async function getCurrencies(apiClient: Axios): Promise<Currency[]> {
    const response = await apiClient.get(
        "currencies.json",
        {
            params: {
                prettyprint: 0,
                show_alternative: 0,
                show_inactive: 0
            }
        }
    );
    const currencyMap = parseCurrencyMap(response.data);
    return toCurrencyList(currencyMap);
}
