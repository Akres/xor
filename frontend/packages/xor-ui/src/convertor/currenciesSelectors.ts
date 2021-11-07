import {selectCurrencies} from "../rootSelectors";
import {RootState} from "../RootState";

export function selectIsLoadingCurrencies(state: RootState) {
    return selectCurrencies(state)?.isLoading;
}

export function selectCurrencyList(state: RootState) {
    return selectCurrencies(state)?.currencies || [];
}
