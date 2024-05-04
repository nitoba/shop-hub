import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order, OrderProps } from '@/domain/entities/order'
import { OrderItem } from '@/domain/entities/order-item'

export function makeOrder(
  overrides: Partial<OrderProps> = {},
  id?: UniqueEntityID,
) {
  return Order.create(
    {
      userId: new UniqueEntityID(),
      orderItems: [
        OrderItem.create({
          itemId: new UniqueEntityID(),
          price: 1000,
          quantity: 1,
        }),
      ],
      ...overrides,
    },
    id,
  )
}
