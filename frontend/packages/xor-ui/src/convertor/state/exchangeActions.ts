import {createAction} from "@reduxjs/toolkit";
import createRuntimeThunk from "../../utils/createRuntimeThunk";
import {selectExchangeItem, selectExchangeItems} from "./exchangeSelectors";
import {Currency, CurrencyAmount} from "@xor/xor-domain";
import {ExchangeItem} from "./ExchangeItem";

export const initializeExchangeItems = createAction<Currency[]>("exchange/initialize");
export const setExchangeItem =
    createAction<{itemIndex: number; currencyAmount: CurrencyAmount}>("exchange/updateExchangeItem");

function createItemsWithNewValues(oldItems: ExchangeItem[], convertedAmounts: CurrencyAmount[]): ExchangeItem[] {
    const amountMap = new Map<string, number>(
        convertedAmounts.map(
            ({code, amount}) => [code, amount]
        )
    );
    return oldItems.map(({currencyAmount}) => ({
        isLoading: false,
        currencyAmount: {
            code: currencyAmount.code,
            // All the currencies that are in the original array are also in the new one, so we should not get undefined
            amount: amountMap.get(currencyAmount.code) as number
        }
    }));
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
        const convertedItems = createItemsWithNewValues(otherItems, convertedAmounts);

        return [
            ...convertedItems.slice(0, itemIndex),
            itemToConvertFrom,
            ...convertedItems.slice(itemIndex)
        ];
    }
);
