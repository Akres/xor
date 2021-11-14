import {configureStore} from "@reduxjs/toolkit";
import {Store} from "redux";
import {RootState} from "@xor/xor-ui";
import {Runtime} from "@xor/xor-domain";


export default function createStore(
    rootReducer: any,
    runtime: Runtime
): Store<RootState> {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: runtime
            }
        })
    }) as Store<RootState>;
}
