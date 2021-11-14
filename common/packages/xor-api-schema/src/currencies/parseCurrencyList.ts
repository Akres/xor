import {CurrencyList, Convert} from "./generated";

export default function parseCurrencyList(jsonStr: string): CurrencyList {
    return Convert.toCurrencyList(jsonStr);
}
