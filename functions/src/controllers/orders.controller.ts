import { Request, Response } from "express";
import { OrderService } from "../services/order.service.js";
import { Order, QueryParamsOrder } from "../models/order.model.js";

export class OrdersController {
    static async save(req: Request, res: Response) {
        // #swagger.tags = ['Orders']
        // #swagger.summary = Criação de pedido
        // #swagger.description = 'Cria um novo pedido no sistema.'
        /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addOrder"
                    }
                }
            }
        } */

        // cria uma nova instância da classe Order, inicializando-a com os dados já validados do req.body
        // possibilita usar os metodos de Order, como o getTotal
        const order = new Order(req.body);

        await new OrderService().save(order);
        res.status(201).json({ message: "Pedido criado com sucesso!" });
    }

    // faz o papel de getAll e search por query params
    static async search(req: Request, res: Response) {
        // #swagger.tags = ['Orders']
        // #swagger.summary = Listagem de pedidos
        // swagger.description = 'Retorna todos os pedidos ou filtra por parâmetros específicos.'
        /* 
        #swagger.parameters['empresaId'] = {
        $ref: "#/components/parameters/empresaId"
        }

        #swagger.parameters['dataInicio'] = {
        $ref: "#/components/parameters/dataInicio"
        }

        #swagger.parameters['dataFim'] = {
        $ref: "#/components/parameters/dataFim"
        }

        #swagger.parameters['status'] = {
        $ref: "#/components/parameters/orderStatus"
        }
*/
        const orders = await new OrderService().search(req.query as QueryParamsOrder);

        res.json(orders);
    }

    static async getItems(req: Request, res: Response) {
        // #swagger.tags = ['Orders']
        // #swagger.summary = Itens do pedido
        // #swagger.description = 'Retorna os itens do pedido especificado pelo ID.'

        const items = await new OrderService().getItems(req.params.id);
        res.json(items);
    }
    static async getById(req: Request, res: Response) {
        // #swagger.tags = ['Orders']
        // #swagger.summary = Detalhes do pedido
        // #swagger.description = 'Retorna os detalhes do pedido especificado pelo ID.'

        const pedido = await new OrderService().getById(req.params.id);
        res.json(pedido);
    }

    static async changeStatus(req: Request, res: Response) {
        // #swagger.tags = ['Orders']
        // #swagger.summary = Alteração de status do pedido
        // #swagger.description = 'Altera o status do pedido especificado pelo ID.'
        /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/updateOrderStatus"
                    }
                }
            }
        } */

        await new OrderService().changeStatus(req.params.id, req.body);
        res.json({ message: `Status alterado com sucesso!` });
    }
}
