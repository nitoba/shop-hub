import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { ItemProps } from './item'
import { Service } from './service'

export type OffServiceProps = ItemProps

export class OffService extends Service<OffServiceProps> {
  get priceInCents(): number {
    return this.props.priceInCents
  }

  get name(): string {
    return this.props.name
  }

  static create(props: OffServiceProps, id?: UniqueEntityID): OffService {
    return new OffService(
      {
        ...props,
      },
      id,
    )
  }
}
