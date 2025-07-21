import { Request, Response } from "express";
import { PaymentService } from "../services/payment-method.service.js";
import { PaymentMethod } from "../models/payments-methods.model.js";

export class PaymentMethodController {
    static async getAll(req: Request, res: Response) {
        // #swagger.tags = ['Payment Methods']
        // #swagger.summary = Listagem de métodos de pagamento
        // #swagger.description = 'Retorna todos os métodos de pagamento disponíveis no sistema.'

        res.json(await new PaymentService().getAll());
    }

    static async getById(req: Request, res: Response) {
        // #swagger.tags = ['Payment Methods']
        // #swagger.summary = Detalhes do método de pagamento
        // #swagger.description = 'Retorna os detalhes do método de pagamento especificado pelo ID.'

        const id = req.params.id;
        res.json(await new PaymentService().getById(id));
    }

    static async save(req: Request, res: Response) {
        // #swagger.tags = ['Payment Methods']
        // #swagger.summary = Criação de método de pagamento
        // #swagger.description = 'Cria um novo método de pagamento no sistema.'
        /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addPaymentMethod"
                    }
                }
            }
        } */

        const paymentMethod = req.body;
        await new PaymentService().save(paymentMethod);
        res.status(201).json({
            message: "Método de Pagamento criado com sucesso",
        });
    }

    static async update(req: Request, res: Response) {
        // #swagger.tags = ['Payment Methods']
        // #swagger.summary = Atualização de método de pagamento
        // ##swagger.description = 'Atualiza os dados do método de pagamento especificado pelo ID.'
        /* #swagger.requestBody = {
             required: true,
             content: {
                 "application/json": {
                     schema: {
                         $ref: "#/components/schemas/updatePaymentMethod"
                     }
                 }
             }
         } */

        const id = req.params.id;
        const paymentMethod = req.body as PaymentMethod;
        await new PaymentService().update(id, paymentMethod);
        res.json({
            message: "Método de Pagamento atualizado com sucesso",
        });
    }

    static async delete(req: Request, res: Response) {
        // #swagger.tags = ['Payment Methods']
        // #swagger.summary = Exclusão de método de pagamento
        // #swagger.description = 'Exclui o método de pagamento especificado pelo ID.'

        const id = req.params.id;
        await new PaymentService().delete(id);
        res.status(204).end();
    }
}
