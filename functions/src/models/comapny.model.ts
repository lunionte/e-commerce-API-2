import { Joi } from "celebrate";
import { validator } from "cpf-cnpj-validator";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";

export class Company {
    id: string;
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

    constructor(data: Company | any) {
        this.id = data.id;
        this.logomarca = data.logomarca;
        this.cpfCnpj = data.cpfCnpj;
        this.razaoSocial = data.razaoSocial;
        this.nomeFantasia = data.nomeFantasia;
        this.horarioFuncionamento = data.horarioFuncionamento;
        this.telefone = data.telefone;
        this.endereco = data.endereco;
        this.localizacao = data.localizacao;
        this.taxaEntrega = data.taxaEntrega;
        this.ativa = data.ativa ?? true;
    }
}
const cpfCnpjValidator = Joi.extend(validator);

export const newCompanySchema = Joi.object({
    logomarca: Joi.alternatives()
        .try(Joi.string().base64().required(), Joi.string().uri().trim().required(), Joi.valid(null))
        .required(),
    cpfCnpj: Joi.alternatives()
        .try(cpfCnpjValidator.document().cpf(), cpfCnpjValidator.document().cnpj())
        .required()
        .messages({ "alternatives.match": "CPF ou CPNJ inválidos" }),
    razaoSocial: Joi.string().uppercase().trim().required(),
    nomeFantasia: Joi.string().uppercase().trim().required(),
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
        .try(cpfCnpjValidator.document().cpf(), cpfCnpjValidator.document().cnpj())
        .required()
        .messages({ "alternatives.match": "CPF ou CPNJ inválidos" }),
    razaoSocial: Joi.string().uppercase().trim().required(),
    nomeFantasia: Joi.string().uppercase().trim().required(),
    telefone: Joi.string()
        .regex(/^([1-9]{2}9[0-9]{8}|[1-9]{2}[2-8][0-9]{7})$/)
        .required(),
    horarioFuncionamento: Joi.string().required(),
    endereco: Joi.string().required(),
    localizacao: Joi.string().required(),
    taxaEntrega: Joi.number().required(),
    ativa: Joi.boolean().required(),
});

export const companyConverter: FirestoreDataConverter<Company> = {
    toFirestore: (company: Company): DocumentData => {
        return {
            logomarca: company.logomarca,
            cpfCnpj: company.cpfCnpj,
            razaoSocial: company.razaoSocial,
            nomeFantasia: company.nomeFantasia,
            telefone: company.telefone,
            horarioFuncionamento: company.horarioFuncionamento,
            endereco: company.endereco,
            localizacao: company.localizacao,
            taxaEntrega: company.taxaEntrega,
            ativa: company.ativa,
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): Company => {
        return new Company({
            id: snapshot.id,
            ...snapshot.data(),
        });
    },
};
