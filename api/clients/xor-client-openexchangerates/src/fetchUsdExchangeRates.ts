import {Axios} from "axios";
import {CurrencyRates} from "@xor/xor-client-domain";
import {config} from "@xor/xor-config";
import parseExchangeRates from "./schema/parseExchangeRates";
import {ExchangeRates} from "./schema/ExchangeRates";
import {booleanToParam} from "./booleanToParam";

function toCurrencyRates(exchangeRates: ExchangeRates): CurrencyRates {
    return {
        baseCurrency: "USD",
        validUntil: (exchangeRates.timestamp + 60 * 60) * 1000, // Free plan has 1 hour updates
        rates: {
            ...exchangeRates.rates
        }
    };
}

export default async function fetchUsdExchangeRates(apiClient: Axios): Promise<CurrencyRates> {
    const response = await apiClient.get(
        "latest.json",
        {
            params: {
                app_id: config.api.openexchangerates.appId,
                base: "USD",
                prettyprint: 0,
                show_alternative: booleanToParam(config.api.useAlternativeCurrencies)
            }
        }
    );
    const exchangeRates = parseExchangeRates(response.data);
    return toCurrencyRates(exchangeRates);
}
