import {RootState} from "../../state/RootState";
import {selectStats} from "../../state/rootSelectors";

export function selectIsLoadingStats(state: RootState) {
    return selectStats(state)?.isLoading;
}

