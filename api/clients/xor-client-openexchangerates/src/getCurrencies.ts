import {Axios} from "axios";
import {Currency} from "@xor/xor-client-domain";
import {config} from "@xor/xor-config";
import parseCurrencyMap from "./schema/parseCurrencyMap";
import {CurrencyMap} from "./schema/CurrencyMap";
import {booleanToParam} from "./booleanToParam";

function toCurrencyList(currencyMap: CurrencyMap): Currency[] {
    return Object.entries(currencyMap).map(([code, name]) => ({code, name}));
}

export default async function getCurrencies(apiClient: Axios): Promise<Currency[]> {
    const response = await apiClient.get(
        "currencies.json",
        {
            params: {
                prettyprint: 0,
                show_alternative: booleanToParam(config.api.useAlternativeCurrencies),
                show_inactive: booleanToParam(config.api.useInactiveCurrencies)
            }
        }
    );
    const currencyMap = parseCurrencyMap(response.data);
    return toCurrencyList(currencyMap);
}
