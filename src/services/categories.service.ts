import { NotFoundError } from "../errors/not-found.error.js";
import { Category } from "../models/category.model.js";
import { CategoriesRepository } from "../repositories/categories.repository.js";

// método mais limpo e flexível
const repository = new CategoriesRepository();

export class CategoriesService {
    async getAll() {
        return repository.getAll();
    }

    async getById(id: string) {
        const category = await repository.getById(id);
        if (!category) {
            throw new NotFoundError("Categoria não encontrada");
        }
        return category;
    }

    async save(category: Category) {
        await repository.save(category);
    }

    async update(id: string, category: Category) {
        const _category = await this.getById(id);

        _category!.descricao = category.descricao;
        _category!.ativa = category.ativa;

        await repository.update(id, _category!);
    }

    async delete(id: string) {
        await repository.delete(id);
    }
}
