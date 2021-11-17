import {Axios} from "axios";
import {CurrencyRates} from "@xor/xor-client-domain";
import parseExchangeRates from "./schema/parseExchangeRates";
import {ExchangeRates} from "./schema/ExchangeRates";

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
                app_id: process.env["XOR_API_OPENEXCHANGERATES_APP_ID"],
                base: "USD",
                prettyprint: 0,
                show_alternative: 0
            }
        }
    );
    const exchangeRates = parseExchangeRates(response.data);
    return toCurrencyRates(exchangeRates);
}
