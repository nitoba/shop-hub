import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Address } from '../value-objects/address'
import { Age } from '../value-objects/age'

export type UserProps = {
  name: string
  documentId: string
  age: Age
  address: Address
}

export class User extends Entity<UserProps> {
  get name(): string {
    return this.props.name
  }

  get documentId(): string {
    return this.props.documentId
  }

  get age(): Age {
    return this.props.age
  }

  get address(): Address {
    return this.props.address
  }

  static create(props: UserProps, id?: UniqueEntityID): User {
    return new User(
      {
        ...props,
      },
      id,
    )
  }
}
