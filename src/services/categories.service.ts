import { NotFoundError } from "../errors/not-found.error.js";
import { Category } from "../models/category.model.js";
import { CategoriesRepository } from "../repositories/categories.repository.js";

// método mais limpo e flexível

export class CategoriesService {
    private categoriesRepostiroy: CategoriesRepository;

    constructor() {
        this.categoriesRepostiroy = new CategoriesRepository();
    }

    async getAll() {
        return this.categoriesRepostiroy.getAll();
    }

    async getById(id: string) {
        const category = await this.categoriesRepostiroy.getById(id);
        if (!category) {
            throw new NotFoundError("Categoria não encontrada");
        }
        return category;
    }

    async save(category: Category) {
        await this.categoriesRepostiroy.save(category);
    }

    async update(id: string, category: Category) {
        const _category = await this.categoriesRepostiroy.getById(id);
        if (!_category) {
            throw new NotFoundError("Categoria não encontrada");
        }

        _category.descricao = category.descricao;
        _category.ativa = category.ativa;

        await this.categoriesRepostiroy.update(id, _category!);
    }

    async delete(id: string) {
        await this.categoriesRepostiroy.delete(id);
    }
}
