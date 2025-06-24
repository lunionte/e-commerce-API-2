import { Request, Response } from "express";
import { CategoriesService } from "../services/categories.service.js";

// método mais limpo e flexivel

export class CategoriesController {
    static async getAll(req: Request, res: Response) {
        res.json(await new CategoriesService().getAll());
    }

    static async getById(req: Request, res: Response) {
        const categoryId = req.params.id;
        res.json(await new CategoriesService().getById(categoryId));
    }

    static async save(req: Request, res: Response) {
        const category = req.body;
        await new CategoriesService().save(category);
        res.status(201).json({ message: "Categoria criada com sucesso!" });
    }

    static async update(req: Request, res: Response) {
        const categoryId = req.params.id;
        const category = req.body;
        await new CategoriesService().update(categoryId, category);
        res.json({
            message: "Categoria alterada com sucesso!",
        });
    }

    static async delete(req: Request, res: Response) {
        const categoryId = req.params.id;
        await new CategoriesService().delete(categoryId);
        res.status(204).end();
    }
}
