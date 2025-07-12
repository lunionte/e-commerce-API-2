import { NotFoundError } from "../errors/not-found.error.js";
import { ValidationError } from "../errors/validation.error.js";
import { Order, QueryParamsOrder } from "../models/order.model.js";
import { ComapanyRepository } from "../repositories/comapany.repository.js";
import { OrderRepostitory } from "../repositories/order.repository.js";
import { PaymentMethodsRepository } from "../repositories/payment-methods.repository.js";
import { ProductsRepository } from "../repositories/products.repository.js";

export class OrderService {
    private orderRepository: OrderRepostitory;
    private companyRepository: ComapanyRepository;
    private paymentMethodRepository: PaymentMethodsRepository;
    private productsRepository: ProductsRepository;

    constructor() {
        this.orderRepository = new OrderRepostitory();
        this.companyRepository = new ComapanyRepository();
        this.paymentMethodRepository = new PaymentMethodsRepository();
        this.productsRepository = new ProductsRepository();
    }

    async save(order: Order) {
        const empresa = await this.companyRepository.getById(order.empresa.id!);
        const formaPagamento = await this.paymentMethodRepository.getById(order.formaPagamento.id);

        // se não achar o id, retorna um erro
        if (!empresa) {
            throw new NotFoundError("Empresa não encontrada");
        }
        order.empresa = empresa;

        if (!formaPagamento) {
            throw new NotFoundError("Forma de pagamento não encontrada");
        }
        order.formaPagamento = formaPagamento;

        for (let item of order.items) {
            const produto = await this.productsRepository.getById(item.produto.id);
            if (!produto) {
                throw new ValidationError("Produto não encontrado");
            }

            item.produto = produto;
        }

        await this.orderRepository.save(order);
    }

    async search(queryParams: QueryParamsOrder): Promise<Order[]> {
        return await this.orderRepository.search(queryParams);
    }
}
