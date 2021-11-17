import {Client} from "@xor/xor-client-domain";
import getCurrencies from "./getCurrencies";
import getExchangeRates from "./getExchangeRates";
import createApiClient from "./createApiClient";
import {createCachedGetter} from "@xor/xor-api-cache";
import fetchUsdExchangeRates from "./fetchUsdExchangeRates";

export default function createClient(): Client {
    const apiClient = createApiClient();

    // Free plan on openexchangerates does not support fetching currencies other than USD. We will have to
    // fetch USD and recalculate from that. We can cache the USD results here so it is transparent to api layer and we
    // reduce calls for different source currencies
    const getUsdRatesCached = createCachedGetter(
        () => "USD",
        fetchUsdExchangeRates.bind(null, apiClient)
    );


    return {
        getExchangeRates: getExchangeRates.bind(null, apiClient, getUsdRatesCached),
        getCurrencies: getCurrencies.bind(null, apiClient)
    };
}
