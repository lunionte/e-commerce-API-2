import { Joi } from "celebrate";

// modelos de tratamento de dados obtidos pelo celebrate

export interface User {
    id: string;
    nome: string;
    email: string;
    password?: string;
}

export const authSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6),
});

export const userSchema = Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});
