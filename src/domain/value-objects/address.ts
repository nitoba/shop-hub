import { ValueObject } from '@/core/entities/value-objects'
import { ZIPCode } from './zip-code'

export type AddressProps = {
  street: string
  number: number
  neighborhood: string
  city: string
  state: string
  zipCode: ZIPCode
}

export class Address extends ValueObject<AddressProps> {
  get street(): string {
    return this.props.street
  }

  get number(): number {
    return this.props.number
  }

  get neighborhood(): string {
    return this.props.neighborhood
  }

  get city(): string {
    return this.props.city
  }

  get state(): string {
    return this.props.state
  }

  get zipCode(): ZIPCode {
    return this.props.zipCode
  }

  static create(props: AddressProps): Address {
    return new Address(props)
  }
}
