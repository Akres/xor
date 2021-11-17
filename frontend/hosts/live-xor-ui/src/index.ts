import express, {Request, Response, NextFunction} from "express";
import {config} from "@xor/xor-config";
import server from "./server";

const app = express();
const port = config.frontend.port;

app
    .use("/static", express.static("dist"))
    .get("*", (req: Request, res: Response, next: NextFunction) => server(req, res, next))
    .listen(port, () => {
        console.log("🚀 listening on port " + port);
    });

