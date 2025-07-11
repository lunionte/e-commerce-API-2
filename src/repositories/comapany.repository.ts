import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Company, companyConverter } from "../models/comapny.model.js";

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
        // usa fromFireStore
        const snapshot = await this.collection.withConverter(companyConverter).get();
        return snapshot.docs.map((doc) => doc.data());
    }

    async getById(id: string): Promise<Company | null> {
        // usa fromFireStore
        const doc = await this.collection.withConverter(companyConverter).doc(id).get();
        return doc.data() ?? null;
    }

    async save(company: Company) {
        // usa toFireStore
        await this.collection.withConverter(companyConverter).add(company);
    }

    async update(company: Company) {
        // usa toFireStore
        await this.collection.withConverter(companyConverter).doc(company.id).set(company);
    }
}
