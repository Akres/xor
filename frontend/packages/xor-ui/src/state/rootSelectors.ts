import {RootState} from "./RootState";

export function selectCurrencies(state: RootState) {
    return state?.currencies;
}

export function selectExchange(state: RootState) {
    return state?.exchange;
}

export function selectError(state: RootState) {
    return state?.error;
}
