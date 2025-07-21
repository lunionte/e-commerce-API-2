import { Request, Response } from "express";
import { ProductsService } from "../services/products.service.js";
import { Product } from "../models/product.model.js";

export class ProductsController {
    static async getAll(req: Request, res: Response) {
        // #swagger.tags = ['Products']
        // #swagger.summary = Listagem de produtos
        // #swagger.description = 'Retorna todos os produtos disponíveis no sistema.'

        res.json(await new ProductsService().getAll());
    }

    static async search(req: Request, res: Response) {
        // #swagger.tags = ['Products']
        // #swagger.summary = Busca de produtos
        // #swagger.description = 'Retorna os produtos filtrados pela categoria especificada.'

        const categoryId = req.query.categoryId as string;
        const product = await new ProductsService().search(categoryId);

        res.json(product);
    }

    static async getById(req: Request, res: Response) {
        // #swagger.tags = ['Products']
        // #swagger.summary = Detalhes do produto
        // #swagger.description = 'Retorna os detalhes do produto especificado pelo ID.'

        const id = req.params.id;
        res.json(await new ProductsService().getById(id));
    }

    static async save(req: Request, res: Response) {
        // #swagger.tags = ['Products']
        // #swagger.summary = Criação de produto
        // #swagger.description = 'Cria um novo produto no sistema.'
        /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addProduct"
                    }
                }
            }
        } */

        const product = req.body as Product;

        await new ProductsService().save(product);

        res.status(201).json({
            message: "Produto criado com sucesso!",
        });
    }

    static async update(req: Request, res: Response) {
        // #swagger.tags = ['Products']
        // #swagger.summary = Atualização de produto
        // #swagger.description = 'Atualiza os dados do produto especificado pelo ID.'
        /* #swagger.requestBody = {
             required: true,
             content: {
                 "application/json": {
                     schema: {
                         $ref: "#/components/schemas/updateProduct"
                     }
                 }
             }
         } */

        const id = req.params.id;
        const product = req.body as Product;

        await new ProductsService().update(id, product);

        res.json({ message: "Produto atualizado com sucesso" });
    }

    static async delete(req: Request, res: Response) {
        // #swagger.tags = ['Products']
        // #swagger.summary = Exclusão de produto
        // #swagger.description = 'Exclui o produto especificado pelo ID.'

        const id = req.params.id;

        await new ProductsService().delete(id);

        res.status(204).end();
    }
}
