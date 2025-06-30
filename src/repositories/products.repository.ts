import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Product } from "../models/product.model.js";

export class ProductsRepository {
    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection("products");
    }

    async getAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        }) as Product[];
    }

    async getById(id: string) {
        const doc = await this.collection.doc(id).get();
        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data(),
            } as Product;
        } else {
            return null;
        }
    }

    async save(product: Product) {
        await this.collection.add(product);
    }

    async update(product: Product) {
        let docRef = this.collection.doc(product.id);
        await docRef.set({
            nome: product.nome,
            descricao: product.descricao,
            preco: product.preco,
            imagem: product.imagem,
            categoria: product.categoria,
            ativa: product.ativa,
        });
    }

    async delete(id: string) {
        await this.collection.doc(id).delete();
    }
}
