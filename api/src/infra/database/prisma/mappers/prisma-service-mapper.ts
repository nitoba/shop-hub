import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InternetService } from '@/domain/entities/internet-service'
import { OffService } from '@/domain/entities/off-service'
import { ZIPCode } from '@/domain/value-objects/zip-code'
import {
  Item as PrismaService,
  Coverage,
  ItemsOnCoverage,
} from '@prisma/client'

export class PrismaServiceMapper {
  static toOffServiceDomain(model: PrismaService) {
    return OffService.create(
      {
        name: model.name,
        priceInCents: model.priceInCents,
      },
      new UniqueEntityID(model.id),
    )
  }

  static toInternetServiceDomain(
    model: PrismaService & {
      itemsOnCoverage: (ItemsOnCoverage & { coverage: Coverage })[]
    },
  ) {
    return InternetService.create(
      {
        name: model.name,
        priceInCents: model.priceInCents,
        coverage: model.itemsOnCoverage.map(
          (coverage) =>
            ZIPCode.create({ value: coverage.coverage.zipCode })
              .value as ZIPCode,
        ),
      },
      new UniqueEntityID(model.id),
    )
  }
}
