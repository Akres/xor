import sleep from "sleep-promise";
import {Currency} from "@xor/xor-domain";

export default async function fetchCurrencies(): Promise<Currency[]> {
    await sleep(1000);
    return [
        {code: "EUR", name: "Euro"},
        {code: "USD", name: "United States Dollar"},
        {code: "CZK", name: "Czech Koruna"},
        {code: "JPY", name: "Japanese Yen"}
    ];
}
