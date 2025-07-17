import express from "express";
import { initializeApp as initializeAdminApp } from "firebase-admin/app";
import { initializeApp as initializeFirebaseApp } from "firebase/app";
import { routes } from "./routes/index.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middleware.js";
import { auth } from "./middlewares/auth.middleware.js";
import { onRequest } from "firebase-functions/v1/https";
import { logsRoutes } from "./middlewares/logs.middleware.js";
import { swaggerDocs } from "./routes/swagger-docs.route.js";

// Passa o que o express vai usar
// No routes(app) por exemplo, a função recebe app, que no routes/index, apenas guia falando para esse app usar o express.json() e o caminho das rotas

initializeAdminApp();
initializeFirebaseApp({
    apiKey: process.env.FIRE_API_KEY,
});
const app = express();

// conseguir usar a autenticação | tem que vir antes das rotas
swaggerDocs(app);
logsRoutes(app);
auth(app);
routes(app);
pageNotFoundHandler(app);
errorHandler(app);

export const api = onRequest(app);
