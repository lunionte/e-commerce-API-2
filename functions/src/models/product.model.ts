import { Joi } from "celebrate";
import { Category } from "./category.model.js";
import { DocumentData, FirestoreDataConverter } from "firebase-admin/firestore";

export class Product {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    imagem: string;
    categoria: Category;
    ativa: boolean;

    constructor(data: Product | any) {
        this.id = data.id;
        this.nome = data.nome;
        this.descricao = data.descricao;
        this.preco = data.preco;
        this.imagem = data.imagem;
        this.categoria = new Category(data.categoria);
        this.ativa = data.ativa ?? true;
    }
}

export const newProductSchema = Joi.object().keys({
    nome: Joi.string().uppercase().trim().min(3).required(),
    descricao: Joi.string().trim().allow(null).default(null),
    preco: Joi.number().positive().required(),
    imagem: Joi.string().base64().allow(null).default(null),
    categoria: Joi.object()
        .keys({
            id: Joi.string().required(),
        })
        .required(),
    ativa: Joi.boolean().only().allow(true).default(true),
});

export const updateProductSchema = Joi.object().keys({
    nome: Joi.string().trim().uppercase().min(3).required(),
    descricao: Joi.string().trim().allow(null).default(null),
    preco: Joi.number().positive().required(),
    imagem: Joi.alternatives()
        .try(Joi.string().base64().required(), Joi.string().uri().required())
        .allow(null)
        .default(null),
    categoria: Joi.object()
        .keys({
            id: Joi.string().required(),
        })
        .required(),
    ativa: Joi.boolean().required(),
});

export const searchQuerySchema = Joi.object().keys({
    categoryId: Joi.string().trim().required(),
});

export const productConverter: FirestoreDataConverter<Product> = {
    toFirestore: (product: Product): DocumentData => {
        return {
            nome: product.nome,
            descricao: product.descricao,
            preco: product.preco,
            imagem: product.imagem,
            categoria: {
                id: product.categoria.id,
                descricao: product.categoria.descricao,
                ativa: product.categoria.ativa,
            },
            ativa: product.ativa,
        };
    },
    fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot): Product => {
        return new Product({
            id: snapshot.id,
            ...snapshot.data(),
        });
    },
};
