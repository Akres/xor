import express, {Request, Response, NextFunction} from "express";
import morgan from "morgan";
import {config} from "@xor/xor-config";
import {Runtime} from "./Runtime";
import {ShutdownCallback} from "./ShutdownCallback";
import handleCurrenciesRequest from "./handlers/handleCurrenciesRequest";
import handleConvertRequest from "./handlers/handleConvertRequest";

const port = config.api.port;

export default function startServer(runtime: Runtime): ShutdownCallback {
    const app = express();

    app.use(morgan("combined"));

    app.get("/currencies", handleCurrenciesRequest.bind(null, runtime));
    app.get("/convert", handleConvertRequest.bind(null, runtime));

    app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
        console.error(err);
        next(err);
    });

    const server = app.listen(port, () => {
        console.log("🚀 listening on port " + port);
    });


    return function shutdownCallback() {
        server.close();
    };

}
