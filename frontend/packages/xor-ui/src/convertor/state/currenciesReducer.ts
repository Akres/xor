import {createReducer} from "@reduxjs/toolkit";
import deepFreeze from "deep-freeze-strict";
import {CurrenciesState} from "./CurrenciesState";

import {getCurrencies} from "./currenciesActions";

const initialState = deepFreeze({
    isLoading: true,
    currencies: []
} as CurrenciesState);

export default createReducer<CurrenciesState>(
    initialState,
    (builder) => {
        builder
            .addCase(getCurrencies.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrencies.fulfilled, (state, {payload})=> {
                state.isLoading = false;
                state.currencies = payload;
            })
            .addCase(getCurrencies.rejected, (state)=> {
                state.isLoading = false;
            });
    }
);
