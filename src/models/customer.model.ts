import { Joi } from "celebrate";

export type Customer = {
    nome: string;
    telefone: string;
};

export const customerShema = Joi.object().keys({
    nome: Joi.string().trim().uppercase().min(5).required(),
    telefone: Joi.string()
        .regex(/^([1-9]{2}9[0-9]{8}|[1-9]{2}[2-8][0-9]{7})$/)
        .required(),
});
