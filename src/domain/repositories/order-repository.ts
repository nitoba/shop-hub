import { Order } from '../entities/order'

export interface OrderRepository {
  findById(id: string): Promise<Order | null>
  create(order: Order): Promise<void>
}
