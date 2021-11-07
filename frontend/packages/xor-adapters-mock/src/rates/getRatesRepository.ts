import {RatesRepository} from "@xor/xor-domain";
import fetchCurrencies from "./fetchCurrencies";
import convert from "./convert";

export default function getRatesRepository(): RatesRepository {
    return {
        convert,
        fetchCurrencies
    };
}
