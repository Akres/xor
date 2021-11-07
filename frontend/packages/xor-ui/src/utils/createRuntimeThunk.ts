import {createAsyncThunk} from "@reduxjs/toolkit";
import {Runtime} from "@xor/xor-domain";
import {RootState} from "../RootState";
import {RuntimeThunk} from "./RuntimeThunk";

export default function createRuntimeThunk<ReturnType, ParamType = void>(
    typePrefix: string,
    payloadCreator: RuntimeThunk<ParamType, ReturnType>
) {
    return createAsyncThunk<ReturnType, ParamType, {extra: Runtime; state: RootState}>(
        typePrefix,
        async (param: ParamType, thunkAPI) =>
            payloadCreator(thunkAPI.extra, thunkAPI.getState(), param)
    );
}
