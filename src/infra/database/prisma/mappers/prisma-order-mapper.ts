import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/entities/order'
import { OrderItem } from '@/domain/entities/order-item'
import { Order as PrismaOrder } from '@prisma/client'

export class PrismaOrderMapper {
  static toDomain(model: PrismaOrder) {
    return Order.create(
      {
        orderItems: [
          OrderItem.create({
            itemId: new UniqueEntityID(model.itemId),
            price: model.totalPriceInCents,
            quantity: 1,
          }),
        ],
        userId: new UniqueEntityID(model.userId),
      },
      new UniqueEntityID(model.id),
    )
  }
}
