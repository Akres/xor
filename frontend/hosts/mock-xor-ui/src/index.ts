import express, {Request, Response, NextFunction} from "express";

const app = express();
const port = 3000;

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
