import {selectCurrencies} from "../../state/rootSelectors";
import {RootState} from "../../state/RootState";

export function selectIsLoadingCurrencies(state: RootState) {
    return selectCurrencies(state)?.isLoading;
}

export function selectCurrencyList(state: RootState) {
    return selectCurrencies(state)?.currencies || [];
}
