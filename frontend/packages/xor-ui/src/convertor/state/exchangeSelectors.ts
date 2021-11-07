import {selectExchange} from "../../state/rootSelectors";
import {RootState} from "../../state/RootState";


export function selectExchangeItems(state: RootState) {
    return selectExchange(state)?.items;
}

export function selectExchangeItem(state: RootState, itemIndex: number) {
    return  selectExchangeItems(state)?.[itemIndex];
}
