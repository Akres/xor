import express from "express";
import {Runtime} from "./Runtime";
import {ShutdownCallback} from "./ShutdownCallback";
import handleCurrenciesRequest from "./handlers/handleCurrenciesRequest";

const port = "3333";

export default function startServer(runtime: Runtime): ShutdownCallback {
    const app = express();
    app.use(express.json());

    app.get("/currencies", handleCurrenciesRequest.bind(null, runtime));

    const server = app.listen(port, () => {
        console.log("🚀 listening on port " + port);
    });

    return function shutdownCallback() {
        server.close();
    };

}