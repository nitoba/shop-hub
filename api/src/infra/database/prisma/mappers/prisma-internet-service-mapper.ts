import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InternetService } from '@/domain/entities/internet-service'
import { Item as PrismaInternetService } from '@prisma/client'

export class PrismaInternetServiceMapper {
  static toDomain(model: PrismaInternetService) {
    return InternetService.create(
      {
        name: model.name,
        priceInCents: model.priceInCents,
        coverage: [],
      },
      new UniqueEntityID(model.id),
    )
  }
}
