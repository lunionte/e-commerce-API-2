import { NotFoundError } from "../errors/not-found.error.js";
import { Order } from "../models/order.model.js";
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
        const paymentMethod = await this.paymentMethodRepository.getById(order.formaPagamento.id);

        if (!empresa) {
            throw new NotFoundError("Empresa não encontrada");
        }
        if (!paymentMethod) {
            throw new NotFoundError("Método de pagamento não encontrado");
        }

        for (let item of order.items) {
            const produto = await this.productsRepository.getById(item.produto.id);
            if (!produto) {
                throw new NotFoundError("Produto não encontrado");
            }
            item.produto = produto;
        }

        order.empresa = empresa;
        order.formaPagamento = paymentMethod;

        await this.orderRepository.save(order);
    }
}
