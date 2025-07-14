import { Request, Response } from "express";
import { OrderService } from "../services/order.service.js";
import { Order, QueryParamsOrder } from "../models/order.model.js";

export class OrdersController {
    static async save(req: Request, res: Response) {
        // cria uma nova instância da classe Order, inicializando-a com os dados já validados do req.body
        // possibilita usar os metodos de Order, como o getTotal
        const order = new Order(req.body);

        await new OrderService().save(order);
        res.status(201).json({ message: "Pedido criado com sucesso!" });
    }

    // faz o papel de getAll e search por query params
    static async search(req: Request, res: Response) {
        const orders = await new OrderService().search(req.query as QueryParamsOrder);

        res.json(orders);
    }

    static async getItems(req: Request, res: Response) {
        const items = await new OrderService().getItems(req.params.id);
        res.json(items);
    }
    static async getById(req: Request, res: Response) {
        const pedido = await new OrderService().getById(req.params.id);
        res.json(pedido);
    }
}
