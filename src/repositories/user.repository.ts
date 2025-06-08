import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { User } from "../models/user.model";

// 🗄️ Repositório responsável por gerenciar a persistência dos dados dos usuários no Firestore.
// Armazena informações complementares do usuário (nome, email, etc.) que não fazem parte
// da autenticação, mantendo o documento sincronizado com o uid do Firebase Auth.
// Realiza operações CRUD na coleção "users" do Firestore.

export class UserRepository {
    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection("users");
    }

    async getAll(): Promise<User[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        }) as User[];
    }

    async getById(id: string): Promise<User | null> {
        const doc = await this.collection.doc(id).get();
        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data(),
            } as User;
        } else {
            return null;
        }
    }

    async save(user: User) {
        delete user.password;
        await this.collection.add(user);
    }

    async update(user: User) {
        let docRef = this.collection.doc(user.id);
        await docRef.set({
            nome: user.nome,
            email: user.email,
        });
    }

    async delete(id: string) {
        await this.collection.doc(id).delete();
    }
}
