import React from "react";
import {Request, Response, NextFunction} from "express";
import path from "path";

const packageRoot = process.cwd();


function processRequest(req: Request, res: Response) {
    if (req.path === "/") {
        res.sendFile(path.join(packageRoot, "dist", "index.html"));
    }
}

export default function handleRequest(req: Request, res: Response, next: NextFunction) {
    let error;

    try {
        processRequest(req, res);
    } catch (err) {
        error = err;
    } finally {
        if(error) {
            next(error);
        }
    }
}
