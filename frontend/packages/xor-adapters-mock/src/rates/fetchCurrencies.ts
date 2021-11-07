import {Currency} from "@xor/xor-domain";

export default async function fetchCurrencies(): Promise<Currency[]> {
    return [
        {code: "EUR", name: "Euro"},
        {code: "USD", name: "United States Dollar"},
        {code: "CZK", name: "Czech Koruna"},
        {code: "JPY", name: "Japanese Yen"}
    ];
}
