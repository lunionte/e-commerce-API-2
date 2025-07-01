import { NotFoundError } from "../errors/not-found.error.js";
import { PaymentMethod } from "../models/payments-methods.model.js";
import { PaymentMethodsRepository } from "../repositories/payment-methods.repository.js";

export class PaymentService {
    private paymentRepository: PaymentMethodsRepository;

    constructor() {
        this.paymentRepository = new PaymentMethodsRepository();
    }

    async getAll() {
        return this.paymentRepository.getAll();
    }

    async getById(id: string) {
        const paymentMethod = await this.paymentRepository.getById(id);
        if (!paymentMethod) {
            throw new NotFoundError("Método de Pagamento não encontrado");
        }
        return paymentMethod;
    }

    async save(paymentMethod: PaymentMethod) {
        await this.paymentRepository.save(paymentMethod);
    }

    async update(id: string, paymentMethod: PaymentMethod) {
        const _paymentMethod = await this.paymentRepository.getById(id);
        if (!_paymentMethod) {
            throw new NotFoundError("Método de Pagamento não encontrado");
        }

        _paymentMethod.descricao = paymentMethod.descricao;
        _paymentMethod.ativa = paymentMethod.ativa;

        await this.paymentRepository.update(_paymentMethod);
    }

    async delete(id: string) {
        await this.paymentRepository.delete(id);
    }
}
