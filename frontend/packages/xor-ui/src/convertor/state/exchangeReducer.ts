import {createReducer} from "@reduxjs/toolkit";
import deepFreeze from "deep-freeze-strict";
import {ExchangeState} from "./ExchangeState";

import {convert, initializeExchangeItems, setExchangeItem} from "./exchangeActions";

const initialState = deepFreeze({
    items: []
} as ExchangeState);

export default createReducer<ExchangeState>(
    initialState,
    (builder) => {
        builder
            .addCase(initializeExchangeItems, (state, {payload}) => {
                state.items = payload.slice(0, 2).map((currency) => ({
                    isLoading: false,
                    currencyAmount: {
                        code: currency.code,
                        amount: 0
                    }
                }));
            })
            .addCase(setExchangeItem, (state, {payload}) => {
                state.items[payload.itemIndex] = {isLoading: false, currencyAmount: payload.currencyAmount};
            })
            .addCase(convert.pending, (state, action) => {
                const itemIndex = action.meta.arg;
                state.items = state.items.map((item, i) => ({
                    ...item,
                    isLoading: i !== itemIndex
                }));
            })
            .addCase(convert.fulfilled, (state, {payload}) => {
                state.items = payload;
            });
    }
);
