import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/entities/user'
import { Address } from '@/domain/value-objects/address'
import { Age } from '@/domain/value-objects/age'
import { ZIPCode } from '@/domain/value-objects/zip-code'

export function makeUser(
  overrides: Partial<UserProps> = {},
  id?: UniqueEntityID,
): User {
  return User.create(
    {
      name: 'John Doe',
      address: Address.create({
        city: 'Rio de Janeiro',
        neighborhood: 'Botafogo',
        number: 100,
        state: 'RJ',
        street: 'Rua dos bobos',
        zipCode: ZIPCode.create({ value: '12345678' }).value as ZIPCode,
      }),
      age: Age.create({ value: 18 }).value as Age,
      documentId: Array.from({ length: 9 })
        .map(() => Math.floor(Math.random() * 100).toString())
        .join(''),
      ...overrides,
    },
    id,
  )
}
