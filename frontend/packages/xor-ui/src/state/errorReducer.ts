import {createReducer} from "@reduxjs/toolkit";
import {ErrorState} from "./ErrorState";
import deepFreeze from "deep-freeze-strict";
import {getCurrencies} from "../convertor/state/currenciesActions";
import {convertBaseToAll, convertTarget} from "../convertor/state/exchangeActions";

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
            .addCase(convertBaseToAll.rejected, (state, {error}) => {
                state.hasError = true;
                state.message = error.message || "Unknown error";
            })
            .addCase(convertTarget.rejected, (state, {error}) => {
                state.hasError = true;
                state.message = error.message || "Unknown error";
            });
    }
);
