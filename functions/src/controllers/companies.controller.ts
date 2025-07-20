import { Request, Response } from "express";
import { Company } from "../models/comapny.model.js";
import { CompanyService } from "../services/company.service.js";

// 🔥 CAMADA RESPONSÁVEL POR RECEBER AS REQUISIÇÕES HTTP
// Cada método do controller representa um verbo HTTP (GET, POST, PUT, DELETE)
// O controller recebe os dados da requisição (req), repassa para o service
// que executa a regra de negócio, e então envia a resposta (res) para o cliente.

export class CompaniesController {
    static async getAll(req: Request, res: Response) {
        // #swagger.tags = ['Companies']
        // #swagger.summary = Listagem de empresas
        // #swagger.description = 'Retorna todas as empresas disponíveis no sistema.'

        res.json(await new CompanyService().getAll());
    }

    static async getById(req: Request, res: Response) {
        // #swagger.tags = ['Companies']
        // #swagger.summary = Detalhes da empresa
        // swagger.description = 'Retorna os detalhes da empresa especificada pelo ID.'

        const companyId = req.params.id;
        res.json(await new CompanyService().getById(companyId));
    }

    static async save(req: Request, res: Response) {
        // #swagger.tags = ['Companies']
        // #swagger.summary = Criação de empresa
        // #swagger.description = 'Cria uma nova empresa no sistema.'
        /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/addCompany"
                    }
                }
            }
        } */

        const company = req.body;
        await new CompanyService().save(company);
        res.status(201).json({
            message: `Empresa criada com sucesso!`,
        });
    }

    static async update(req: Request, res: Response) {
        // #swagger.tags = ['Companies']
        // #swagger.summary = Atualização de empresa
        // #swagger.description = 'Atualiza os dados da empresa especificada pelo ID.'

        const companyId = req.params.id;
        const company = req.body as Company;
        await new CompanyService().update(companyId, company);
        res.json({
            message: "Empresa alterada com sucesso!",
        });
    }
}
