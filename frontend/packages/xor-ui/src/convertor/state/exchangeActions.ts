import {createAction} from "@reduxjs/toolkit";
import createRuntimeThunk from "../../utils/createRuntimeThunk";
import {selectExchangeItem, selectExchangeItems} from "./exchangeSelectors";
import {Currency, CurrencyAmount} from "@xor/xor-domain";
import {ExchangeItem} from "./ExchangeItem";

export const initializeExchangeItems = createAction<Currency[]>("exchange/initialize");
export const setExchangeItem =
    createAction<{itemIndex: number; currencyAmount: CurrencyAmount}>("exchange/updateExchangeItem");

function createExchangeItem(currencyAmount: CurrencyAmount): ExchangeItem {
    return {isLoading: false, currencyAmount};
}

export const convert = createRuntimeThunk<ExchangeItem[], number>(
    "exchange/convert",
    async function (runtime, state, _, itemIndex?: number) {
        if (itemIndex === undefined) {
            throw new Error("Uknown item.");
        }
        const itemToConvertFrom = selectExchangeItem(state, itemIndex);
        if (!itemToConvertFrom) {
            throw new Error("Uknown exchange item to convert from.");
        }

        const otherItems = selectExchangeItems(state).filter((_, index) => index != itemIndex);

        const targetCurrencies = otherItems.map(({currencyAmount}) => currencyAmount.code);
        const {amount: baseAmount, code: baseCurrency} = itemToConvertFrom.currencyAmount;

        console.log("Will convert", baseAmount, baseCurrency, "to", targetCurrencies);

        const ratesRepository = runtime.getRatesRepository();
        const convertedAmounts = await ratesRepository.convert(baseAmount, baseCurrency, targetCurrencies);

        return [
            ...convertedAmounts.slice(0, itemIndex).map(createExchangeItem),
            itemToConvertFrom,
            ...convertedAmounts.slice(itemIndex).map(createExchangeItem)
        ];
    }
);
