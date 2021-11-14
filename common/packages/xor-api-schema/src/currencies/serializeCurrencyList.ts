import {CurrencyList, Convert} from "./generated";

export default function serializeCurrencyList(currencyList: CurrencyList): string {
    return Convert.currencyListToJson(currencyList);
}
