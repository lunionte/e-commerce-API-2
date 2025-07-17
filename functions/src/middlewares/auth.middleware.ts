import express, { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/unauthorized.error.js";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { UserService } from "../services/user.service.js";
import { ForbiddenError } from "../errors/forbidden.error.js";
import { NotFoundError } from "../errors/not-found.error.js";

export const auth = (app: express.Express) => {
    app.use(async (req: Request, res: Response, next: NextFunction) => {
        if (
            (req.method === "POST" && req.url.startsWith("/auth/login")) ||
            (req.method === "POST" && req.url.startsWith("/auth/recovery")) ||
            (req.method === "POST" && req.url.startsWith("/auth/signin"))
        ) {
            return next(); // se for um POST e a url começa com '/auth/login' passa para o próximo middlerare, que no caso é o routes(app)
        }

        const token = req.headers.authorization?.split("Bearer ")[1]; // o split divide a array em 2 partes
        if (token) {
            try {
                const decodedIdToken: DecodedIdToken = await getAuth().verifyIdToken(token, true);

                if (decodedIdToken.firebase.sign_in_provider === "anonymous") {
                    return next();
                }

                // já lança um NotFoundError caso não tenha o usuário
                req.user = await new UserService().getById(decodedIdToken.uid);

                return next(); // deu certo, então passa para o próxim middleware, que no caso no index é o routes(app)
            } catch (error) {
                if (error instanceof NotFoundError) {
                    // usuário não existe
                    return next(new ForbiddenError());
                } else {
                    return next(new UnauthorizedError()); // token inválido/revogado/expirado/ problema de verificação
                }
            }
        }
        next(new UnauthorizedError("Token não foi enviado")); // quando o token não foi enviado
    });
};
