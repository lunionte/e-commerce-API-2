import { Request, Response } from "express";
import { PaymentService } from "../services/payment-method.service.js";
import { PaymentMethod } from "../models/payments-methods.model.js";

export class PaymentMethodController {
    static async getAll(req: Request, res: Response) {
        // #swagger.tags = ['Payment Methods']

        res.json(await new PaymentService().getAll());
    }

    static async getById(req: Request, res: Response) {
        // #swagger.tags = ['Payment Methods']

        const id = req.params.id;
        res.json(await new PaymentService().getById(id));
    }

    static async save(req: Request, res: Response) {
        // #swagger.tags = ['Payment Methods']

        const paymentMethod = req.body;
        await new PaymentService().save(paymentMethod);
        res.status(201).json({
            message: "Método de Pagamento criado com sucesso",
        });
    }

    static async update(req: Request, res: Response) {
        // #swagger.tags = ['Payment Methods']

        const id = req.params.id;
        const paymentMethod = req.body as PaymentMethod;
        await new PaymentService().update(id, paymentMethod);
        res.json({
            message: "Método de Pagamento atualizado com sucesso",
        });
    }

    static async delete(req: Request, res: Response) {
        // #swagger.tags = ['Payment Methods']

        const id = req.params.id;
        await new PaymentService().delete(id);
        res.status(204).end();
    }
}
