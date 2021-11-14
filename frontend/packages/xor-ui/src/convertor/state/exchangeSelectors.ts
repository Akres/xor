import {selectExchange} from "../../state/rootSelectors";
import {RootState} from "../../state/RootState";


export function selectBaseCurrencyAmount(state: RootState) {
    return selectExchange(state).baseCurrencyAmount;
}

export function selectTargetItems(state: RootState) {
    return selectExchange(state).targetItems;
}
