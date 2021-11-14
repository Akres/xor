import express, {Request, Response, NextFunction} from "express";
import server from "./server";

const app = express();
const port = 3000;

app
    .use("/static", express.static("dist"))
    .get("*", (req: Request, res: Response, next: NextFunction) => server(req, res, next))
    .listen(port, () => {
        console.log("🚀 listening on port " + port);
    });

