import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Order, QueryParamsOrder } from "../models/order.model.js";

export class OrderRepostitory {
    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection("orders");
    }

    async save(order: Order) {
        await this.collection.add(order);
    }

    async search(queryParams: QueryParamsOrder): Promise<Order[]> {
        // se não colocar isso
        let query: FirebaseFirestore.Query = this.collection;

        if (queryParams.nomeCliente) {
            query = query.where("cliente.nome", "==", queryParams.nomeCliente);
        }

        if (queryParams.empresaId) {
            // o novo query agora é como se fosse o this.collection.where("empresa.id", "==", queryParams.empresaId)
            query = query.where("empresa.id", "==", queryParams.empresaId);
        }

        if (queryParams.status) {
            // o query, que está usando o filtro atribuido anterior no empresaId, agora adiciona mais um filtro em cima desse filtro empresaID
            // ficando como se fosse this.collection.where("empresa.id", "==", queryParams.empresaId).where("status", "==", queryParams.status);
            query = query.where("status", "==", queryParams.status);
        }

        if (queryParams.dataInicio) {
            query = query.where("data", ">=", queryParams.dataInicio);
        }

        if (queryParams.dataFim) {
            query = query.where("data", "<=", queryParams.dataFim);
        }

        const snapshot = await query.get();
        return snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            } as unknown;
        }) as Order[];
    }
}
