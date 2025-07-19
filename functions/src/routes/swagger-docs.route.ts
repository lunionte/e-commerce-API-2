import { Express, Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './../docs/swagger-output.json' with { type: "json" };

export const swaggerDocs = (app: Express) => {
    app.use((req:Request,res:Response, next:NextFunction) => {
        console.log(req.path)
        if (req.path === "/docs") {
            return res.redirect("/api/docs/")
        }
        next()

    })
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
};