import express from "express";
import { initializeApp as initializeAdminApp } from "firebase-admin/app";
import { initializeApp as initializeFirebaseApp } from "firebase/app";
import { routes } from "./routes/index";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { pageNotFoundHandler } from "./middlewares/page-not-found.middleware";

// Passa o que o express vai usar
// No routes(app) por exemplo, a função recebe app, que no routes/index, apenas guia falando para esse app usar o express.json() e o caminho das rotas

initializeAdminApp();
initializeFirebaseApp({
    apiKey: process.env.FIRE_API_KEY,
});
const app = express();

routes(app);

pageNotFoundHandler(app);
errorHandler(app);

app.listen(3000, () => {
    console.log("🟢 Servidor ativo na porta 3000 🟢 ");
});
