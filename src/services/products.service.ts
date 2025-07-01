import { NotFoundError } from "../errors/not-found.error.js";
import { Product } from "../models/product.model.js";
import { CategoriesRepository } from "../repositories/categories.repository.js";
import { ProductsRepository } from "../repositories/products.repository.js";
import { isStorageUrlValid } from "../utils/validation.utils.js";
import { UploadFileService } from "./upload-file.service.js";

export class ProductsService {
    private productRepository: ProductsRepository;
    private categoryRepository: CategoriesRepository;
    private uploadFileService: UploadFileService;

    constructor() {
        this.productRepository = new ProductsRepository();
        this.categoryRepository = new CategoriesRepository();
        this.uploadFileService = new UploadFileService("images/products/");
    }

    async getAll() {
        return this.productRepository.getAll();
    }

    async search(categoryId: string): Promise<Product[]> {
        return this.productRepository.search(categoryId);
    }

    async getById(id: string) {
        const product = this.productRepository.getById(id);
        if (!product) {
            throw new NotFoundError("Produto não encontrado");
        }
        return product;
    }

    async save(product: Product) {
        const categoria = await this.getCategoriaById(product.categoria.id);
        product.categoria = categoria;

        if (product.imagem) {
            product.imagem = await this.uploadFileService.upload(product.imagem);
        }

        await this.productRepository.save(product);
    }

    async update(id: string, product: Product) {
        const _product = await this.productRepository.getById(id);
        const categoria = await this.getCategoriaById(product.categoria.id);

        if (!_product) {
            throw new NotFoundError("Produto não encontrado");
        }

        if (product.imagem && !isStorageUrlValid(product.imagem)) {
            product.imagem = await this.uploadFileService.upload(product.imagem);
        }

        _product.nome = product.nome;
        _product.descricao = product.descricao;
        _product.imagem = product.imagem;
        _product.preco = product.preco;
        _product.categoria = categoria;
        _product.ativa = product.ativa;

        await this.productRepository.update(_product);
    }

    private async getCategoriaById(id: string) {
        const categoria = await this.categoryRepository.getById(id);
        if (!categoria) {
            throw new NotFoundError("Categoria não encontrada");
        }
        return categoria;
    }

    async delete(id: string) {
        await this.productRepository.delete(id);
    }
}
