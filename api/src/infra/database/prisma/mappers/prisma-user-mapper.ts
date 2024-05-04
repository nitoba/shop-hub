import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/entities/user'
import { Address } from '@/domain/value-objects/address'
import { Age } from '@/domain/value-objects/age'
import { ZIPCode } from '@/domain/value-objects/zip-code'
import { User as PrismaUser } from '@prisma/client'

export class PrismaUserMapper {
  static toDomain(model: PrismaUser): User {
    return User.create(
      {
        name: model.name,
        documentId: model.documentId,
        age: Age.create({ value: model.age }).value as Age,
        address: Address.create({
          city: model.city,
          neighborhood: model.neighborhood,
          number: model.number,
          state: model.state,
          street: model.street,
          zipCode: ZIPCode.create({ value: model.zipCode }).value as ZIPCode,
        }),
      },
      new UniqueEntityID(model.id),
    )
  }
}
