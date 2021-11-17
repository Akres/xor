import {NextFunction, Request, Response} from "express";
import {serializeStats} from "@xor/xor-api-schema";
import {Runtime} from "../Runtime";

export default async function handleStatsRequest(
    runtime: Runtime,
    request: Request,
    response: Response,
    next: NextFunction
) {
    try {
        const client = runtime.getStatsClient();
        const stats = await client.getStats();
        response.status(200);
        response.send(serializeStats(stats));
    } catch(e) {
        next(e);
    }
}
