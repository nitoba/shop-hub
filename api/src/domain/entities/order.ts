import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrderItem } from './order-item'

export type OrderProps = {
  userId: UniqueEntityID
  orderItems: OrderItem[]
}

export class Order extends Entity<OrderProps> {
  get userId(): UniqueEntityID {
    return this.props.userId
  }

  get orderItems(): OrderItem[] {
    return this.props.orderItems
  }

  static create(props: OrderProps, id?: UniqueEntityID): Order {
    return new Order(
      {
        ...props,
      },
      id,
    )
  }
}
