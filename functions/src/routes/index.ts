import express from "express";
import { userRoutes } from "./users.route.js";
import { authRoutes } from "./auth.route.js";
import { companyRoutes } from "./companies.route.js";
import { categoriesRoutes } from "./categories.route.js";
import { productsRoutes } from "./products.route.js";
import { paymentMethodRoutes } from "./payment-methods.route.js";
import { orderRoutes } from "./orders.route.js";
import { allowAnonymousUser } from "../middlewares/allow-anonymous-user.middleware.js";

// implementa as rotas de routes (rota localhost:3000/user ou localhost:3000/auth/login por exemplo)

export const routes = (app: express.Express) => {
    app.use(express.json({ limit: "5mb" }));
    app.use(authRoutes); // rota de autenticação de preferência em primeiro plano
    app.use(allowAnonymousUser);

    const autenticatedRoutes = express.Router();
    autenticatedRoutes.use(userRoutes);
    autenticatedRoutes.use(companyRoutes);
    autenticatedRoutes.use(categoriesRoutes);
    autenticatedRoutes.use(productsRoutes);
    autenticatedRoutes.use(paymentMethodRoutes);
    autenticatedRoutes.use(orderRoutes);
    app.use(
        // #swagger.security = [{"bearerAuth": []}]
        autenticatedRoutes
    );
};
