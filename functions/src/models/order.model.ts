import { Joi } from "celebrate";
import { Address, orderAddressSchema } from "./address.model.js";
import { Company } from "./comapny.model.js";
import { Customer, customerShema } from "./customer.model.js";
import { OrderItem, orderItemSchema } from "./order-item.model.js";
import { PaymentMethod } from "./payments-methods.model.js";
import { DocumentData, FieldValue, FirestoreDataConverter, Timestamp } from "firebase-admin/firestore";

export class Order {
    id: string;
    empresa: Company;
    cliente: Customer;
    endereco: Address;
    cpfCnpjCupom: any;
    data: Date;
    isEntrega: boolean;
    formaPagamento: PaymentMethod;
    taxaEntrega: number;
    items?: OrderItem[];
    status: OrderStatus;
    observacao: string;
    subtotal: number;
    total: number;

    constructor(data: Order | any) {
        this.id = data.id;
        this.empresa = new Company(data.empresa);
        this.cliente = data.cliente;
        this.endereco = data.endereco;
        this.cpfCnpjCupom = data.cpfCnpjCupom;
        if (data.data instanceof Timestamp) {
            this.data = data.data.toDate();
        } else {
            this.data = data.data;
        }
        this.isEntrega = data.isEntrega;
        // Converte os dados brutos de formaPagamento em uma instância da classe PaymentMethod.
        // Isso permite aplicar a lógica de inicialização do construtor (ex: valores padrão para 'ativa')
        // e utilizar os métodos e comportamentos definidos na classe PaymentMethod.
        this.formaPagamento = new PaymentMethod(data.formaPagamento);
        this.formaPagamento = new PaymentMethod(data.formaPagamento);
        this.taxaEntrega = data.taxaEntrega;
        // da a possibilidade de usar os metodos do orderitem
        this.items = data.items?.map((item: any) => new OrderItem(item));
        this.status = data.status ?? OrderStatus.pendente;
        this.observacao = data.observacao;
        this.subtotal = data.subtotal;
        this.total = data.total;
    }

    getSubTotal(): number {
        // gera uma array de totais de cada produto, depois reduz essa array para 1 valor só totalizando o total de cada valor da array
        // por exemplo [10,30,50] => 1000
        return this.items?.map((item) => item.getTotal()).reduce((total, next) => total + next, 0) ?? 0;
    }

    getTotal(): number {
        return this.getSubTotal() + this.taxaEntrega;
    }
}

export enum OrderStatus {
    pendente = "PENDENTE",
    aprovado = "APROVADO",
    entrega = "ENTREGA",
    concluido = "CONCLUIDO",
    cancelado = "CANCELADO",
}

export const newOrderSchema = Joi.object().keys({
    empresa: Joi.object()
        .keys({
            id: Joi.string().trim().required(),
        })
        .required(),
    cliente: customerShema.required(),
    isEntrega: Joi.boolean().required(),
    endereco: Joi.alternatives().conditional("isEntrega", {
        is: true,
        then: orderAddressSchema.required(),
    }),
    cpfCnpjCupom: Joi.alternatives()
        .try(Joi.string().length(11).required(), Joi.string().length(14).required())
        .default(null),
    formaPagamento: Joi.object().keys({
        id: Joi.string().trim().required(),
    }),
    taxaEntrega: Joi.number().min(0).required(),
    items: Joi.array().items(orderItemSchema).min(1),
    status: Joi.string().only().allow(OrderStatus.pendente).default(OrderStatus.pendente).required().uppercase(),
    observacao: Joi.string().trim().allow(null).default(null),
});

export type QueryParamsOrder = {
    empresaId?: string;
    dataInicio?: Date;
    dataFim?: Date;
    status?: OrderStatus;
};

export const searchParamsOrderSchema = Joi.object().keys({
    empresaId: Joi.string().trim(),
    dataInicio: Joi.date(),
    dataFim: Joi.date(),
    status: Joi.string()
        .valid(...Object.values(OrderStatus))
        .uppercase(),
    categoria: Joi.string().uppercase(),
});

export const changeStatusSchema = Joi.object()
    .keys({
        status: Joi.string()
            .only()
            .allow(OrderStatus.aprovado, OrderStatus.entrega, OrderStatus.concluido, OrderStatus.cancelado)
            .uppercase(),
    })
    .required();

export const orderConverter: FirestoreDataConverter<Order> = {
    toFirestore: (order: Order): DocumentData => {
        return {
            empresa: {
                id: order.empresa.id,
                logomarca: order.empresa.logomarca,
                cpfCnpj: order.empresa.cpfCnpj,
                razaoSocial: order.empresa.razaoSocial,
                nomeFantasia: order.empresa.nomeFantasia,
                telefone: order.empresa.telefone,
                endereco: order.empresa.endereco,
                localizacao: order.empresa.localizacao,
            },
            cliente: {
                name: order.cliente.nome,
                telefone: order.cliente.telefone,
            },
            endereco: {
                cep: order.endereco.cep,
                logradouro: order.endereco.logradouro,
                numero: order.endereco.numero,
                cidade: order.endereco.cidade,
                uf: order.endereco.uf,
            },
            cpfCnpjCupom: order.cpfCnpjCupom,
            data: FieldValue.serverTimestamp(),
            isEntrega: order.isEntrega,
            formaPagamento: {
                id: order.formaPagamento.id,
                descricao: order.formaPagamento.descricao,
            },
            taxaEntrega: order.taxaEntrega,
            status: order.status,
            observacao: order.observacao,
            subtotal: order.getSubTotal(),
            total: order.getTotal(),
        };
    },
    fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot): Order => {
        return new Order({
            id: snapshot.id,
            ...snapshot.data(),
        });
    },
};
