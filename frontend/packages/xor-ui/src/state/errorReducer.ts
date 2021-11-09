import {createReducer} from "@reduxjs/toolkit";
import {ErrorState} from "./ErrorState";
import deepFreeze from "deep-freeze-strict";
import {getCurrencies} from "../convertor/state/currenciesActions";
import {convert} from "../convertor/state/exchangeActions";

const initialState: ErrorState = deepFreeze({
    hasError: false,
    message: ""
});

export default createReducer<ErrorState>(
    initialState,
    (builder) => {
        builder
            .addCase(getCurrencies.rejected, (state, {error}) => {
                state.hasError = true;
                state.message = error.message || "Unknown error";
            })
            .addCase(convert.rejected, (state, {error}) => {
                state.hasError = true;
                state.message = error.message || "Unknown error";
            });
    }
);
