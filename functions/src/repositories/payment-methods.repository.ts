import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { PaymentMethod, paymentMethodConverter } from "../models/payments-methods.model.js";

export class PaymentMethodsRepository {
    private collection: CollectionReference<PaymentMethod>;

    constructor() {
        this.collection = getFirestore().collection("payment-methods").withConverter(paymentMethodConverter);
    }

    async getAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => doc.data());
    }

    async getById(id: string) {
        const doc = await this.collection.doc(id).get();
        return doc.data() ?? null;
    }

    async save(paymentMethod: PaymentMethod) {
        await this.collection.add(paymentMethod);
    }

    async update(paymentMethod: PaymentMethod) {
        await this.collection.doc(paymentMethod.id).set(paymentMethod);
    }

    async delete(id: string) {
        await this.collection.doc(id).delete();
    }
}
