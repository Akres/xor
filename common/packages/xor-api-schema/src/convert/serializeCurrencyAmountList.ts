import {CurrencyAmountList, Convert} from "./generated";

export default function serializeCurrencyAmountList(currencyAmountList: CurrencyAmountList): string {
    return Convert.currencyAmountListToJson(currencyAmountList);
}
