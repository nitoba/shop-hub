import { Either, left, right } from '@/core/either'
import { ProductRepository } from '../repositories/product-repository'
import { ServiceRepository } from '../repositories/service-repository'
import { ItemNotFoundError } from '../_errors/item-not-found'
import { Order } from '../entities/order'
import { OrderItem } from '../entities/order-item'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrderRepository } from '../repositories/order-repository'
import { InternetService } from '../entities/internet-service'
import { Product } from '../entities/product'
import { OffService } from '../entities/off-service'
import { Service } from '../entities/service'

type ItemType = 'product' | 'service' | 'package'

type PurchaseItemRequest = {
  itemId: string
  itemType: ItemType
  userId: string
}

type PurchaseItemResponse = Either<
  ItemNotFoundError,
  {
    orderId: string
  }
>

export class PurchaseItemUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly serviceRepository: ServiceRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute({
    itemId,
    itemType,
    userId,
  }: PurchaseItemRequest): Promise<PurchaseItemResponse> {
    let repository: ProductRepository | ServiceRepository

    switch (itemType) {
      case 'product':
        repository = this.productRepository
        break
      case 'service':
      case 'package':
        repository = this.serviceRepository
        break
    }

    const item: Product | Service | null = await repository.findById(itemId)

    if (!item) {
      return left(new ItemNotFoundError(itemId))
    }

    if (
      item instanceof InternetService ||
      item instanceof OffService ||
      item instanceof Product
    ) {
      const orderItem = OrderItem.create({
        itemId: new UniqueEntityID(itemId),
        price: item.priceInCents,
        quantity: 1,
      })
      const order = Order.create({
        userId: new UniqueEntityID(userId),
        orderItems: [orderItem],
      })
      await this.orderRepository.create(order)

      return right({
        orderId: order.id.toString(),
      })
    }

    return left(new ItemNotFoundError(itemId))
  }
}
