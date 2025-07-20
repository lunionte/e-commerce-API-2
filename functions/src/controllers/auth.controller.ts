import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
    static async login(req: Request, res: Response) {
        // #swagger.tags = ['Auth']
        // #swagger.summary = Autenticação de usuários e autenticadores
        // #swagger.description = 'Realiza o login do usuário com email e senha, retornando um token de autenticação.'

        const { email, password } = req.body;
        const userRecord = await new AuthService().login(email, password);
        const token = await userRecord.user.getIdToken(true);
        res.json({
            token: token,
        });
    }

    // enviar uma resposta positiva para evitar que hackers' saibam se o email existe ou não
    static async recovery(req: Request, res: Response) {
        // #swagger.tags = ['Auth']
        // #swagger.summary = Recuperação de senha
        // #swagger.description = 'Inicia o processo de recuperação de senha para o usuário com o email fornecido.'

        const { email } = req.body;
        await new AuthService().recovery(email);
        res.end();
    }

    static async signin(req: Request, res: Response) {
        // #swagger.tags = ['Auth']
        // #swagger.summary = Registro de usuários
        // #swagger.description = 'Registra um novo usuário e retorna um token de autenticação.'
        const userRecord = await new AuthService().signin();
        const token = await userRecord.user.getIdToken(true);
        res.json({ token: token });
    }
}
