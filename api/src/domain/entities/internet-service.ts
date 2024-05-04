import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ZIPCode } from '../value-objects/zip-code'
import { ItemProps } from './item'
import { Service } from './service'

export type InternetServiceProps = {
  coverage: ZIPCode[]
} & ItemProps

export class InternetService extends Service<InternetServiceProps> {
  get coverage(): ZIPCode[] {
    return this.props.coverage
  }

  get priceInCents(): number {
    return this.props.priceInCents
  }

  get name(): string {
    return this.props.name
  }

  static create(
    props: InternetServiceProps,
    id?: UniqueEntityID,
  ): InternetService {
    return new InternetService(
      {
        ...props,
      },
      id,
    )
  }
}
