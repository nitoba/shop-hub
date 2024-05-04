import { Order } from '@/domain/entities/order'
import { OrderRepository } from '@/domain/repositories/order-repository'
import { PrismaClient } from '@prisma/client'
import { PrismaOrderMapper } from '../mappers/prisma-order-mapper'

export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async findById(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
    })

    return order ? PrismaOrderMapper.toDomain(order) : null
  }

  async create(order: Order): Promise<void> {
    await this.prisma.order.create({
      data: {
        id: order.id.toString(),
        totalPriceInCents: order.orderItems.reduce(
          (acc, item) => (acc += item.price),
          0,
        ),
        itemId: order.orderItems[0].itemId.toString(),
        userId: order.userId.toString(),
      },
    })
  }
}
