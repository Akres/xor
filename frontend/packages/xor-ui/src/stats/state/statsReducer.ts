import {createReducer} from "@reduxjs/toolkit";
import deepFreeze from "deep-freeze-strict";
import {StatsState} from "./StatsState";
import {getStats} from "./statsActions";

const initialState: StatsState = deepFreeze({
    isLoading: true,
    favouriteTargetCurrency: "-",
    totalConversionRequests: 0,
    totalUsdConverted: 0
});

export default createReducer<StatsState>(
    initialState,
    (builder) => {
        builder
            .addCase(getStats.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getStats.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.favouriteTargetCurrency = payload.favouriteTargetCurrency;
                state.totalConversionRequests = payload.totalConversionRequests;
                state.totalUsdConverted = payload.totalUsdConverted;
            })
            .addCase(getStats.rejected, (state) => {
                state.isLoading = false;
            });
    }
);
