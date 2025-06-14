import express from "express";
import { userRoutes } from "./users.route.js";
import { authRoutes } from "./auth.route.js";
import { companyRoutes } from "./companies.route.js";

// implementa as rotas de routes (rota localhost:3000/user ou localhost:3000/auth/login por exemplo)

export const routes = (app: express.Express) => {
    app.use(express.json({ limit: "5mb" }));
    app.use(authRoutes); // rota de autenticação de preferência em primeiro plano
    app.use(userRoutes);
    app.use(companyRoutes);
};
