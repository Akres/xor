import {RatesRepository} from "@xor/xor-domain";
import fetchRates from "./fetchRates";
import fetchCurrencies from "./fetchCurrencies";

export default function getRatesRepository(): RatesRepository {
    return {
        fetchRates,
        fetchCurrencies
    };
}
