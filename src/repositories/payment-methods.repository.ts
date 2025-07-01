import { CollectionReference, getFirestore, QuerySnapshot } from "firebase-admin/firestore";
import { PaymentMethod } from "../models/payments-methods.model.js";

export class PaymentMethodsRepository {
    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection("payment-methods");
    }

    async getAll() {
        const snapshot = await this.collection.get();
        return this.snapshotToArray(snapshot);
    }

    async getById(id: string) {
        const doc = await this.collection.doc(id).get();
        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data(),
            } as PaymentMethod;
        } else {
            return null;
        }
    }

    async save(paymentMethod: PaymentMethod) {
        await this.collection.add(paymentMethod);
    }

    async update(paymentMethod: PaymentMethod) {
        let docRef = this.collection.doc(paymentMethod.id);

        await docRef.set({
            descricao: paymentMethod.descricao,
            ativa: paymentMethod.ativa,
        });
    }

    async delete(id: string) {
        await this.collection.doc(id).delete();
    }

    private snapshotToArray(snapshot: QuerySnapshot) {
        return snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        }) as PaymentMethod[];
    }
}
