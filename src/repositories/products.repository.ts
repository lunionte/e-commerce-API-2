import { CollectionReference, getFirestore, QuerySnapshot } from "firebase-admin/firestore";
import { Product } from "../models/product.model.js";

export class ProductsRepository {
    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection("products");
    }

    async getAll() {
        const snapshot = await this.collection.get();
        return this.snapshotToArray(snapshot);
    }

    async search(categoryId: string): Promise<Product[]> {
        // o categoria.id é o do products, não o geral do firebase
        // ele entra no products, procura em cada produto onde a categoria.id é = categoryId
        const snapshot = await this.collection.where("categoria.id", "==", categoryId).get();
        return this.snapshotToArray(snapshot);
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

    private snapshotToArray(snapshot: QuerySnapshot): Product[] {
        return snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        }) as Product[];
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

    async getCountByCategoria(categoryId: string): Promise<number> {
        const countSnapshot = await this.collection.where("categoria.id", "==", categoryId).count().get();
        return countSnapshot.data().count;
    }
}
