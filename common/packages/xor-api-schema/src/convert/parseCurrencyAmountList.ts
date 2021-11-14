import {CurrencyAmountList, Convert} from "./generated";

export default function parseCurrencyAmountList(jsonStr: string): CurrencyAmountList {
    return Convert.toCurrencyAmountList(jsonStr);
}
