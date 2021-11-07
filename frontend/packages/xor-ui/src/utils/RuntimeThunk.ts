import {RootState} from "../state/RootState";
import {Runtime} from "@xor/xor-domain";
import {Dispatch} from "redux";

export type RuntimeThunk<ParamType, ReturnType> =
    (runtime: Runtime, state: RootState, dispatch: Dispatch, param?: ParamType) => Promise<ReturnType>;
