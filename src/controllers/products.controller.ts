import { Request, Response } from "express";
import { ProductsService } from "../services/products.service.js";
import { Product } from "../models/product.model.js";

export class ProductsController {
    static async getAll(req: Request, res: Response) {
        res.json(await new ProductsService().getAll());
    }

    static async search(req: Request, res: Response) {
        const categoryId = req.query.categoryId as string;
        const product = await new ProductsService().search(categoryId);

        res.json(product);
    }

    static async getById(req: Request, res: Response) {
        const id = req.params.id;
        res.json(await new ProductsService().getById(id));
    }

    static async save(req: Request, res: Response) {
        const product = req.body as Product;

        await new ProductsService().save(product);

        res.status(201).json({
            message: "Produto criado com sucesso!",
        });
    }

    static async update(req: Request, res: Response) {
        const id = req.params.id;
        const product = req.body as Product;

        await new ProductsService().update(id, product);

        res.json({ message: "Produto atualizado com sucesso" });
    }

    static async delete(req: Request, res: Response) {
        const id = req.params.id;

        await new ProductsService().delete(id);

        res.status(204).end();
    }
}
