import {RatesRepository} from "@xor/xor-domain";
import fetchCurrencies from "./fetchCurrencies";
import convert from "./convert";
import createApiClient from "../createApiClient";

export default function getRatesRepository(): RatesRepository {
    const apiClient = createApiClient();

    return {
        convert: convert.bind(null, apiClient),
        fetchCurrencies: fetchCurrencies.bind(null, apiClient)
    };
}
