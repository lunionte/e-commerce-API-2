import { User } from "../models/user.model.js";
import { NotFoundError } from "../errors/not-found.error.js";
import { UserRepository } from "../repositories/user.repository.js";
import { AuthService } from "./auth.service.js";

// 🔥 CAMADA RESPONSÁVEL PELA REGRA DE NEGÓCIO
// Aqui ficam as regras que definem como os dados são manipulados,
// como, por exemplo, validar se um usuário existe antes de atualizar ou deletar.
// O service recebe dados do controller, executa a lógica necessária
// e utiliza o repository para acessar o banco de dados.

export class UserService {
    private userRepository;
    private authService;

    constructor() {
        this.userRepository = new UserRepository();
        this.authService = new AuthService();
    }

    async getAll(): Promise<User[]> {
        return this.userRepository.getAll();
    }

    async getById(id: string): Promise<User> {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new NotFoundError("Usuário não encontrado!");
        }
        return user;
    }

    async save(user: User) {
        const userAuth = await this.authService.create(user); // além do id,cria um usuário com base no auth.service, que nesse caso é email, password e name (dispaly name)
        user.id = userAuth.uid;
        await this.userRepository.update(user);
    }

    async update(id: string, user: User) {
        const _user = await this.userRepository.getById(id);
        if (!_user) {
            throw new NotFoundError("Usuário não encontrado!");
        }

        _user.nome = user.nome;
        _user.email = user.email;

        await this.authService.update(id, user);

        await this.userRepository.update(_user);
    }

    async delete(id: string) {
        await this.authService.delete(id);
        await this.userRepository.delete(id);
    }
}
