import {RootState} from "./RootState";
import {selectError} from "./rootSelectors";

export function selectHasError(state: RootState) {
    return selectError(state)?.hasError;
}

export function selectErrorMessage(state: RootState) {
    return selectError(state)?.message;
}
