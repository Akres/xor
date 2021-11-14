import {createAction} from "@reduxjs/toolkit";
import {Currency, CurrencyAmount} from "@xor/xor-domain";
import createRuntimeThunk from "../../utils/createRuntimeThunk";
import {ExchangeItem} from "./ExchangeItem";
import {selectBaseCurrencyAmount, selectTargetItems} from "./exchangeSelectors";

export const initializeExchangeItems = createAction<Currency[]>("exchange/initialize");
export const setBaseCurrencyAmount =
    createAction<CurrencyAmount>("exchange/setBaseCurrencyAmount");
export const setTargetCurrency = createAction<{targetIndex: number; currency: Currency}>("exchange/setTargetCurrency");
export const swapTargetItem = createAction<number>("exchange/swapTargetItem");
export const removeTargetItem = createAction<number>("exchange/removeTargetItem");
export const addTargetItem = createAction("exchange/addTargetItem");

function createItemsWithNewAmounts(oldItems: ExchangeItem[], convertedAmounts: CurrencyAmount[]): ExchangeItem[] {
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

export const convertBaseToAll = createRuntimeThunk<ExchangeItem[]>(
    "exchange/convertBaseToAll",
    async function (runtime, state) {
        const baseAmount = selectBaseCurrencyAmount(state);
        const targetItems = selectTargetItems(state);
        const targetCurrencies = targetItems.map((item) => item.currencyAmount.code);

        const ratesRepository = runtime.getRatesRepository();
        const convertedAmounts = await ratesRepository.convert(baseAmount.amount, baseAmount.code, targetCurrencies);
        return createItemsWithNewAmounts(targetItems, convertedAmounts);
    }
);

export const convertTarget = createRuntimeThunk<CurrencyAmount, number>(
    "exchange/convertTarget",
    async function (runtime, state, _, targetIndex) {
        if (targetIndex === undefined) {
            throw new Error("Cannot convert item with undefined index");
        }
        const baseCurrencyAmount = selectBaseCurrencyAmount(state);
        const targetItems = selectTargetItems(state);
        const targetItem = targetItems?.[targetIndex];
        if (!targetItem) {
            throw new Error(`Cannot convert item with index ${targetIndex}`);
        }
        const targetCurrency = targetItem.currencyAmount.code;

        const ratesRepository = runtime.getRatesRepository();
        const convertedAmounts = await ratesRepository.convert(
            baseCurrencyAmount.amount,
            baseCurrencyAmount.code,
            [targetCurrency]
        );
        return convertedAmounts[0]; // Will get only one result
    }
);
