import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";

// 🔥 CAMADA RESPONSÁVEL POR RECEBER AS REQUISIÇÕES HTTP
// Cada método do controller representa um verbo HTTP (GET, POST, PUT, DELETE)
// O controller recebe os dados da requisição (req), repassa para o service
// que executa a regra de negócio, e então envia a resposta (res) para o cliente.

export class UsersController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        res.json(await new UserService().getAll());
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        res.json(await new UserService().getById(userId));
    }

    static async save(req: Request, res: Response, next: NextFunction) {
        let user = req.body;
        await new UserService().save(user);
        res.status(201).json({
            message: `Usuário criado com sucesso!`,
        });
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        let user = req.body as User;
        await new UserService().update(userId, user);
        res.json({
            message: "Usuário alterado com sucesso!",
        });
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        await new UserService().delete(userId);
        res.status(204).end();
    }
}
