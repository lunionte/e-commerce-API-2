import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import { UserService } from "../services/user.service.js";

// 🔥 CAMADA RESPONSÁVEL POR RECEBER AS REQUISIÇÕES HTTP
// Cada método do controller representa um verbo HTTP (GET, POST, PUT, DELETE)
// O controller recebe os dados da requisição (req), repassa para o service
// que executa a regra de negócio, e então envia a resposta (res) para o cliente.

export class UsersController {
    static async getAll(req: Request, res: Response) {
        // #swagger.tags = ['Users']
        // #swagger.summary = Listagem de usuários
        // #swagger.description = 'Retorna todos os usuários disponíveis no sistema.'
        res.json(await new UserService().getAll());
    }

    static async getById(req: Request, res: Response) {
        // #swagger.tags = ['Users']
        // #swagger.summary = Detalhes do usuário
        // #swagger.description = 'Retorna os detalhes do usuário especificado pelo ID.'
        const userId = req.params.id;
        res.json(await new UserService().getById(userId));
    }

    static async save(req: Request, res: Response) {
        // #swagger.tags = ['Users']
        // #swagger.summary = Criação de usuário
        // #swagger.description = 'Cria um novo usuário no sistema.'

        /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addUser"
                    }
                }
            }
        } 
        */

        const user = req.body as User;
        await new UserService().save(user);
        res.status(201).json({
            message: `Usuário criado com sucesso!`,
        });
    }

    static async update(req: Request, res: Response) {
        // #swagger.tags = ['Users']
        // #swagger.summary = Atualização de usuário
        // #swagger.description = 'Atualiza os dados do usuário especificado pelo ID.'
        /* #swagger.requestBody = {
             required: true,
             content: {
                 "application/json": {
                     schema: {
                         $ref: "#/components/schemas/updateUser"
                     }
                 }
             }
         } */

        const userId = req.params.id;
        const user = req.body as User;
        await new UserService().update(userId, user);
        res.json({
            message: "Usuário alterado com sucesso!",
        });
    }

    static async delete(req: Request, res: Response) {
        // #swagger.tags = ['Users']
        // #swagger.summary = Exclusão de usuário
        // #swagger.description = 'Exclui o usuário especificado pelo ID.'

        const userId = req.params.id;
        await new UserService().delete(userId);
        res.status(204).end();
    }
}
