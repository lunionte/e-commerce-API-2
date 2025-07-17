import { NotFoundError } from "../errors/not-found.error.js";
import { ValidationError } from "../errors/validation.error.js";
import { Category } from "../models/category.model.js";
import { CategoriesRepository } from "../repositories/categories.repository.js";
import { ProductsRepository } from "../repositories/products.repository.js";

// método mais limpo e flexível

export class CategoriesService {
    private categoriesRepostiroy: CategoriesRepository;
    private productsRepository: ProductsRepository;

    constructor() {
        this.categoriesRepostiroy = new CategoriesRepository();
        this.productsRepository = new ProductsRepository();
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
        const categoriesCount = await this.productsRepository.getCountByCategoria(id);
        if (categoriesCount > 0) {
            throw new ValidationError("Não é possível excluir uma categoria com produtos relacionados");
        }
        await this.categoriesRepostiroy.delete(id);
    }
}
