import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export type OrderItemProps = {
  itemId: UniqueEntityID
  price: number
  quantity: number
}

export class OrderItem extends Entity<OrderItemProps> {
  get itemId(): UniqueEntityID {
    return this.props.itemId
  }

  get price(): number {
    return this.props.price
  }

  get quantity(): number {
    return this.props.quantity
  }

  static create(props: OrderItemProps, id?: UniqueEntityID): OrderItem {
    return new OrderItem(
      {
        ...props,
      },
      id,
    )
  }
}
