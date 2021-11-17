import express, {Request, Response, NextFunction} from "express";
import {config} from "@xor/xor-config";

const app = express();
const port = config.frontend.port;

let server = require("./server").default;

app
    .use("/static", express.static("dist"))
    .get("*", (req: Request, res: Response, next: NextFunction) => server(req, res, next))
    .listen(port, () => {
        console.log("🚀 listening on port " + port);
    });

if (module.hot) {
    module.hot.accept("./server", function () {
        server = require("./server").default;
    });
}
