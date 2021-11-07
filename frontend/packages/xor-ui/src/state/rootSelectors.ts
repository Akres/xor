import {RootState} from "./RootState";

export function selectCurrencies(state: RootState) {
    return state?.currencies;
}

export function selectExchange(state: RootState) {
    return state?.exchange;
}
