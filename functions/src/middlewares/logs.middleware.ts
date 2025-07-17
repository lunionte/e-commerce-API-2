import express, { NextFunction, Request, Response } from "express";

export const logsRoutes = (app: express.Express) => {
    app.use(async (req: Request, res: Response, next: NextFunction) => {
        const method = req.method;
        const path = req.url;

        console.log(`MÉTODO ${method}: ${path}`);

        next();
    });
};
