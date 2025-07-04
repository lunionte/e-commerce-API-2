import { Joi } from "celebrate";

export type Company = {
    id?: string;
    logomarca: string;
    cpfCnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    telefone: string;
    horarioFuncionamento: string;
    endereco: string;
    localizacao: string;
    taxaEntrega: number;
    ativa: boolean;
};

export const newCompanySchema = Joi.object({
    logomarca: Joi.alternatives()
        .try(Joi.string().base64().required(), Joi.string().uri().trim().required(), Joi.valid(null))
        .required(),
    cpfCnpj: Joi.alternatives()
        .try(Joi.string().trim().length(11).required(), Joi.string().trim().length(14).required())
        .required(),
    razaoSocial: Joi.string().required(),
    nomeFantasia: Joi.string().required(),
    telefone: Joi.string()
        .regex(/^([1-9]{2}9[0-9]{8}|[1-9]{2}[2-8][0-9]{7})$/)
        .required(),
    horarioFuncionamento: Joi.string().required(),
    endereco: Joi.string().required(),
    localizacao: Joi.string().required(),
    taxaEntrega: Joi.number().required(),
    ativa: Joi.boolean().only().allow(true).default(true),
});

export const updateCompanySchema = Joi.object({
    logomarca: Joi.alternatives()
        .try(
            Joi.string().trim().base64().required(), // se ja ja tiver logomarca, quando for alterar tem que enviar um base 64
            Joi.string().trim().uri().required()
        )
        .required(),
    cpfCnpj: Joi.alternatives()
        .try(Joi.string().trim().length(11).required(), Joi.string().trim().trim().length(14).required())
        .required(),
    razaoSocial: Joi.string().required(),
    nomeFantasia: Joi.string().required(),
    telefone: Joi.string()
        .regex(/^([1-9]{2}9[0-9]{8}|[1-9]{2}[2-8][0-9]{7})$/)
        .required(),
    horarioFuncionamento: Joi.string().required(),
    endereco: Joi.string().required(),
    localizacao: Joi.string().required(),
    taxaEntrega: Joi.number().required(),
    ativa: Joi.boolean().required(),
});
