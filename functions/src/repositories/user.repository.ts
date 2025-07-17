import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { User, userConverter } from "../models/user.model.js";

// 🗄️ Repositório responsável por gerenciar a persistência dos dados dos usuários no Firestore.
// Armazena informações complementares do usuário (nome, email, etc.) que não fazem parte
// da autenticação, mantendo o documento sincronizado com o uid do Firebase Auth.
// Realiza operações CRUD na coleção "users" do Firestore.

export class UserRepository {
    private collection: CollectionReference<User>;

    constructor() {
        this.collection = getFirestore().collection("users").withConverter(userConverter);
    }

    async getAll(): Promise<User[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => doc.data());
    }

    async getById(id: string): Promise<User | null> {
        const doc = await this.collection.doc(id).get();
        return doc.data() ?? null;
    }

    async save(user: User) {
        await this.collection.add(user);
    }

    async update(user: User) {
        await this.collection.doc(user.id).set(user);
    }

    async delete(id: string) {
        await this.collection.doc(id).delete();
    }
}
