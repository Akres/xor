import {CurrencyAmount} from "@xor/xor-domain";
import {Axios} from "axios";
import {parseCurrencyAmountList} from "@xor/xor-api-schema";


export default async function convert(
    apiClient: Axios,
    baseAmount: number,
    baseCurrency: string,
    targetCurrencies: string[]
): Promise<CurrencyAmount[]> {
    const currencyAmountList = await apiClient.get(
        "/convert",
        {
            params: {
                from: baseCurrency,
                amount: baseAmount,
                to: targetCurrencies
            }
        }
    );

    return parseCurrencyAmountList(currencyAmountList.data).amounts;
}
