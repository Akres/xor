import {Axios} from "axios";
import {RatesRepository} from "@xor/xor-domain";
import fetchCurrencies from "./fetchCurrencies";
import convert from "./convert";

export default function getRatesRepository(apiClient: Axios): RatesRepository {
    return {
        convert: convert.bind(null, apiClient),
        fetchCurrencies: fetchCurrencies.bind(null, apiClient)
    };
}
