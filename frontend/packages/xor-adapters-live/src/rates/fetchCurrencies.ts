import {Axios} from "axios";
import {Currency} from "@xor/xor-domain";

export default async function fetchCurrencies(apiClient: Axios): Promise<Currency[]> {
    const response = await apiClient.get("/currencies");
    console.log(response.data);
    return response.data;
}
