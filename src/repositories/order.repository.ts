import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Order, orderConverter, OrderStatus, QueryParamsOrder } from "../models/order.model.js";
import dayjs from "dayjs";
import { OrderItem, orderItemConverter } from "../models/order-item.model.js";
import { NotFoundError } from "../errors/not-found.error.js";

export class OrderRepostitory {
    private collection: CollectionReference<Order>;

    constructor() {
        this.collection = getFirestore().collection("orders").withConverter(orderConverter);
    }

    async save(order: Order) {
        const batch = getFirestore().batch();

        // Cabeçalho do pedido
        const orderRef = this.collection.doc();
        batch.create(orderRef, order);

        // Itens do pedido
        const itemsRef = orderRef.collection("items").withConverter(orderItemConverter);
        for (let item of order.items!) {
            batch.create(itemsRef.doc(), item);
        }

        // caso tenha algum erro, ele não cria um novo order
        await batch.commit();

        /*
        // cria uma referencia do documento order
        const orderRef = await this.collection.add(order);
        for (let item of order.items) {
            // adiciona uma subcoleção items dentro de order pra cada item
            await orderRef.collection("items").withConverter(orderItemConverter).add(item);
        }
            */
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
            query = query.where("data", ">=", queryParams.dataInicio);
        }

        if (queryParams.dataFim) {
            queryParams.dataFim = dayjs(queryParams.dataFim).add(1, "day").endOf("day").toDate();
            query = query.where("data", "<=", queryParams.dataFim);
        }

        const snapshot = await query.get();
        return snapshot.docs.map((doc) => doc.data());
    }

    async getItems(pedidoId: string): Promise<OrderItem[]> {
        // Acessa o documento do pedido específico (pelo ID) na coleção 'orders'.
        const pedidoRef = this.collection.doc(pedidoId);

        // Busca todos os documentos na subcoleção 'items' desse pedido.
        // O 'withConverter' garante que cada item seja transformado em uma instância da classe OrderItem,
        // permitindo o uso de seus métodos e lógica de inicialização.
        const snapshot = await pedidoRef.collection("items").withConverter(orderItemConverter).get();

        // Retorna a lista de itens do pedido, já como instâncias OrderItem.
        return snapshot.docs.map((doc) => doc.data());
    }

    async getById(pedidoId: string): Promise<Order> {
        const orderRef = await this.collection.doc(pedidoId).get();
        const order = orderRef.data();
        if (!order) {
            throw new NotFoundError("Pedido não encontrado!");
        }
        // adiciona novamente o array de items no pedido
        order.items = await this.getItems(pedidoId);
        return order;
    }
    async changeStatus(pedidoId: string, status: OrderStatus) {
        // o set permite alterar apenas campos que forem passados contando se for passado o merge: true junto,
        // caso o merge seja falso, ele substitui tudo
        // precisa tirar o conveter porque estamos passando somente o status
        await this.collection.withConverter(null).doc(pedidoId).set(
            { status: status },
            {
                merge: true,
            }
        );
    }
}
