import { NotFoundError } from "../errors/not-found.error.js";
import { ComapanyRepository } from "../repositories/comapany.repository.js";
import { Company } from "../models/comapny.model.js";
import { UploadFileService } from "./upload-file.service.js";

// 🔥 CAMADA RESPONSÁVEL PELA REGRA DE NEGÓCIO
// Aqui ficam as regras que definem como os dados são manipulados,
// como, por exemplo, validar se um usuário existe antes de atualizar ou deletar.
// O service recebe dados do controller, executa a lógica necessária
// e utiliza o repository para acessar o banco de dados.

export class CompanyService {
    private companyRepository: ComapanyRepository;
    private uploadFileService: UploadFileService;

    constructor() {
        this.companyRepository = new ComapanyRepository();
        this.uploadFileService = new UploadFileService("images/companies/"); // nome da pasta virtual
    }

    async getAll(): Promise<Company[]> {
        return this.companyRepository.getAll();
    }

    async getById(id: string): Promise<Company> {
        const company = await this.companyRepository.getById(id);
        if (!company) {
            throw new NotFoundError("Empresa não encontrado!");
        }
        return company;
    }

    async save(company: Company) {
        const imageUrl = await this.uploadFileService.upload(company.logomarca); // no upload retorna a publicUrl que é a url da imagem
        company.logomarca = imageUrl;
        await this.companyRepository.save(company);
    }

    async update(id: string, company: Company) {
        const _company = await this.companyRepository.getById(id);
        if (!_company) {
            throw new NotFoundError("Empresa não encontrado!");
        }

        Object.assign(_company, {
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
        });

        await this.companyRepository.update(_company);
    }
}
