import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Service, ServiceProps } from './service'

export type PackageServiceProps = ServiceProps

export class PackageService extends Service<PackageServiceProps> {
  get priceInCents(): number {
    return this.props.priceInCents
  }

  get name(): string {
    return this.props.name
  }

  static create(
    props: PackageServiceProps,
    id?: UniqueEntityID,
  ): PackageService {
    return new PackageService(
      {
        ...props,
      },
      id,
    )
  }
}
