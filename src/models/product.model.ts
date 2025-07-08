import { Joi } from "celebrate";
import { Category } from "./category.model.js";

export type Product = {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    imagem: string;
    categoria: Category;
    ativa: boolean;
};

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
