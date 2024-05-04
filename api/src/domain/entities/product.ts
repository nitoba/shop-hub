import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Item, ItemProps } from './item'

export type ProductProps = ItemProps

export class Product extends Item {
  get priceInCents(): number {
    return this.props.priceInCents
  }

  get name(): string {
    return this.props.name
  }

  static create(props: ProductProps, id?: UniqueEntityID): Product {
    return new Product(
      {
        ...props,
      },
      id,
    )
  }
}
