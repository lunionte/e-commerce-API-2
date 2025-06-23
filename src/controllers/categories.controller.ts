import { Request, Response } from "express";
import { CategoriesService } from "../services/categories.service.js";

// método mais limpo e flexivel
const service = new CategoriesService();

export class CategoriesController {
    static async getAll(req: Request, res: Response) {
        res.json(await service.getAll());
    }

    static async getById(req: Request, res: Response) {
        const categoryId = req.params.id;
        res.json(await service.getById(categoryId));
    }

    static async save(req: Request, res: Response) {
        const category = req.body;
        await service.save(category);
        res.status(201).json({ message: "Categoria criada com sucesso!" });
    }

    static async update(req: Request, res: Response) {
        const categoryId = req.params.id;
        const category = req.body;
        await service.update(categoryId, category);
        res.json({
            message: "Categoria alterada com sucesso!",
        });
    }

    static async delete(req: Request, res: Response) {
        const categoryId = req.params.id;
        await service.delete(categoryId);
        res.status(204).end();
    }
}
