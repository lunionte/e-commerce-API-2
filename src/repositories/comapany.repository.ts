import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Company } from "../models/comapny.model";

// 🗄️ Repositório responsável por gerenciar a persistência dos dados dos usuários no Firestore.
// Armazena informações complementares do usuário (nome, email, etc.) que não fazem parte
// da autenticação, mantendo o documento sincronizado com o uid do Firebase Auth.
// Realiza operações CRUD na coleção "users" do Firestore.

export class ComapanyRepository {
    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection("companies");
    }

    async getAll(): Promise<Company[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        }) as Company[];
    }

    async getById(id: string): Promise<Company | null> {
        const doc = await this.collection.doc(id).get();
        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data(),
            } as Company;
        } else {
            return null;
        }
    }

    async save(company: Company) {
        await this.collection.add(company);
    }

    async update(company: Company) {
        let docRef = this.collection.doc(company.id!);
        delete company.id;
        await docRef.set(company);
    }
}
