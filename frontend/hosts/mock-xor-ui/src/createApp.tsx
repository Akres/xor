import React from "react";
import {Provider} from "react-redux";
import {createRuntime} from "@xor/xor-adapters-mock";
import {App, rootReducer} from "@xor/xor-ui";
import createStore from "./createStore";

export default function createApp() {
    const runtime = createRuntime();
    const store = createStore(rootReducer, runtime);

    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
