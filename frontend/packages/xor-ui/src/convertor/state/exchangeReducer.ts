import {createReducer} from "@reduxjs/toolkit";
import deepFreeze from "deep-freeze-strict";
import {ExchangeState} from "./ExchangeState";

import {
    addTargetItem,
    convertBaseToAll, convertTarget,
    initializeExchangeItems, removeTargetItem,
    setBaseCurrencyAmount,
    setTargetCurrency, swapTargetItem
} from "./exchangeActions";

const initialState = deepFreeze({
    baseCurrencyAmount: {
        code: "XXX",
        amount: 0
    },
    targetItems: []
} as ExchangeState);

export default createReducer<ExchangeState>(
    initialState,
    (builder) => {
        builder
            .addCase(initializeExchangeItems, (state, {payload}) => {
                const baseCurrency = payload[0];
                const targetCurrency = payload[1];
                state.baseCurrencyAmount = {
                    code: baseCurrency.code,
                    amount: 0
                };
                state.targetItems = [{
                    isLoading: false,
                    currencyAmount: {
                        code: targetCurrency.code,
                        amount: 0
                    }
                }];
            })
            .addCase(setBaseCurrencyAmount, (state, {payload}) => {
                state.baseCurrencyAmount = payload;
            })
            .addCase(setTargetCurrency, (state, {payload: {targetIndex, currency}}) => {
                state.targetItems[targetIndex].currencyAmount.code = currency.code;
            })
            .addCase(addTargetItem, (state) => {
                state.targetItems.push(state.targetItems[state.targetItems.length - 1]);
            })
            .addCase(swapTargetItem, (state, {payload: targetIndex}) => {
                const item = state.targetItems[targetIndex];
                state.targetItems[targetIndex] = {
                    isLoading: false,
                    currencyAmount: state.baseCurrencyAmount
                };
                state.baseCurrencyAmount = item.currencyAmount;
            })
            .addCase(removeTargetItem, (state, {payload: targetIndex}) => {
                state.targetItems = state.targetItems.filter((item, i) => i !== targetIndex);
            })
            .addCase(convertBaseToAll.pending, (state) => {
                state.targetItems = state.targetItems.map((item) => ({
                    ...item,
                    isLoading: true
                }));
            })
            .addCase(convertBaseToAll.fulfilled, (state, {payload}) => {
                state.targetItems = payload.map((item) => ({
                    ...item,
                    isLoading: false
                }));
            })
            .addCase(convertBaseToAll.rejected, (state ) => {
                state.targetItems = state.targetItems.map(({currencyAmount}) => ({
                    currencyAmount,
                    isLoading: false
                }));
            })
            .addCase(convertTarget.pending, (state, action) => {
                const targetIndex = action.meta.arg;
                state.targetItems[targetIndex].isLoading = true;
            })
            .addCase(convertTarget.fulfilled, (state, action) => {
                const targetIndex = action.meta.arg;
                const currencyAmount = action.payload;
                state.targetItems[targetIndex] = {
                    isLoading: false,
                    currencyAmount
                };
            })
            .addCase(convertTarget.rejected, (state, action) => {
                const targetIndex = action.meta.arg;
                state.targetItems[targetIndex].isLoading = false;
            });
    }
);
