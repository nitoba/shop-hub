import { Order } from "@/domain/entities/order";
import { OrderRepository } from "@/domain/repositories/order-repository";

export class InMemoryOrderRepository implements OrderRepository {

    items: Order[] = [];

    async findById(id: string): Promise<Order | null> {
        const order = this.items.find(order => order.id.toString() === id)
        return order || null
    }
    async create(order: Order): Promise<void> {
        this.items.push(order)
    }
}