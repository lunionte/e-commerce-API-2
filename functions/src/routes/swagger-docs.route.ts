import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './../docs/swagger-output.json' with { type: "json" };

export const swaggerDocs = (app: Express) => {
    console.log('Swagger file:', swaggerFile); // Verifique se o arquivo está sendo carregado
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
};