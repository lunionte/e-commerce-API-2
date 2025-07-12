import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Order, orderConverter, QueryParamsOrder } from "../models/order.model.js";
import dayjs from "dayjs";

export class OrderRepostitory {
    private collection: CollectionReference<Order>;

    constructor() {
        this.collection = getFirestore().collection("orders").withConverter(orderConverter);
    }

    async save(order: Order) {
        await this.collection.add(order);
    }

    async search(queryParams: QueryParamsOrder): Promise<Order[]> {
        // se não colocar isso
        let query: FirebaseFirestore.Query<Order> = this.collection;

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
            // adiciona mais um dia na data, faz ela começar no inicio do dia (00:00) e no formato dd/mm/yyyy
            queryParams.dataInicio = dayjs(queryParams.dataInicio).add(1, "day").startOf("day").toDate();
            console.log(`Data início: ${queryParams.dataInicio}`);
            query = query.where("data", ">=", queryParams.dataInicio);
        }

        if (queryParams.dataFim) {
            queryParams.dataFim = dayjs(queryParams.dataFim).add(1, "day").endOf("day").toDate();
            console.log(`Data fim: ${queryParams.dataFim}`);
            query = query.where("data", "<=", queryParams.dataFim);
        }

        const snapshot = await query.get();
        return snapshot.docs.map((doc) => doc.data());
    }
}
