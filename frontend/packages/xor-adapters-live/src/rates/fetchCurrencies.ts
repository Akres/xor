import {Axios} from "axios";
import {Currency} from "@xor/xor-domain";
import {parseCurrencyList} from "@xor/xor-api-schema";

export default async function fetchCurrencies(apiClient: Axios): Promise<Currency[]> {
    const response = await apiClient.get("/currencies");
    const currencyList = parseCurrencyList(response.data);
    return currencyList.currencies;
}
