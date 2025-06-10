import express, { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { UserService } from "../services/user.service";
import { ForbiddenError } from "../errors/forbidden.error";

export const auth = (app: express.Express) => {
    app.use(async (req: Request, res: Response, next: NextFunction) => {
        if (
            (req.method === "POST" && req.url.startsWith("/auth/login")) ||
            (req.method === "POST" && req.url.startsWith("auth/recovery"))
        ) {
            return next(); // se for um POST e a url começa com '/auth/login' passa para o próximo middlerare, que no caso é o routes(app)
        }

        const token = req.headers.authorization?.split("Bearer ")[1]; // o split divide a array em 2 partes
        if (token) {
            try {
                const decodedIdToken: DecodedIdToken = await getAuth().verifyIdToken(token, true);

                const user = await new UserService().getById(decodedIdToken.uid);

                //  com o usuário cadastrado (no banco de dados), as vezes pode lançar um token sem ter um usuario cadastrado

                if (!user) {
                    return next(new ForbiddenError());
                }
                req.user = user;

                return next(); // deu certo, então passa para o próxim middleware, que no caso no index é o routes(app)
            } catch (error) {
                next(new UnauthorizedError()); // token inválido/revogado/expirado/ problema de verificação
            }
        }
        next(new UnauthorizedError("Token não foi enviado")); // quando o token não foi enviado
    });
};
