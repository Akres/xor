import {RootState} from "../RootState";
import {Runtime} from "@xor/xor-domain";

export type RuntimeThunk<ParamType, ReturnType> =
    (runtime: Runtime, state: RootState, param?: ParamType) => Promise<ReturnType>;
