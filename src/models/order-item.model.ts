import { Joi } from "celebrate";
import { Product } from "./product.model.js";

export type OrderItem = {
    produto: Product;
    qtde: number;
    observacao: number;
};

export const orderItemSchema = Joi.object().keys({
    produto: Joi.object()
        .keys({
            id: Joi.string().trim().required(),
        })
        .required(),
    qtde: Joi.number().integer().positive(),
    observacao: Joi.string().trim().allow(null).default(null),
});
