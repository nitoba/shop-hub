import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Product } from '@/domain/entities/product'
import { Item as PrismaProduct } from '@prisma/client'

export class PrismaProductMapper {
  static toDomain(model: PrismaProduct) {
    return Product.create(
      {
        name: model.name,
        priceInCents: model.priceInCents,
      },
      new UniqueEntityID(model.id),
    )
  }
}
