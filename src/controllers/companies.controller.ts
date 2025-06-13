import { Request, Response } from "express";
import { Company } from "../models/comapny.model";
import { CompanyService } from "../services/company.service";

// 🔥 CAMADA RESPONSÁVEL POR RECEBER AS REQUISIÇÕES HTTP
// Cada método do controller representa um verbo HTTP (GET, POST, PUT, DELETE)
// O controller recebe os dados da requisição (req), repassa para o service
// que executa a regra de negócio, e então envia a resposta (res) para o cliente.

export class CompaniesController {
    static async getAll(req: Request, res: Response) {
        res.json(await new CompanyService().getAll());
    }

    static async getById(req: Request, res: Response) {
        let companyId = req.params.id;
        res.json(await new CompanyService().getById(companyId));
    }

    static async save(req: Request, res: Response) {
        let company = req.body;
        await new CompanyService().save(company);
        res.status(201).json({
            message: `Empresa criada com sucesso!`,
        });
    }

    static async update(req: Request, res: Response) {
        let companyId = req.params.id;
        let company = req.body as Company;
        await new CompanyService().update(companyId, company);
        res.json({
            message: "Empresa alterada com sucesso!",
        });
    }
}
