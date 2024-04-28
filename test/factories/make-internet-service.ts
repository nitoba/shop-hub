import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  InternetService,
  InternetServiceProps,
} from '@/domain/entities/internet-service'
import { ZIPCode } from '@/domain/value-objects/zip-code'

export function makeInternetService(
  override: Partial<InternetServiceProps> = {},
  id?: UniqueEntityID,
): InternetService {
  return InternetService.create(
    {
      name: 'Internet Service 1',
      priceInCents: 74100,
      coverage: [ZIPCode.create({ value: '64010090' }).value as ZIPCode],
      ...override,
    },
    id,
  )
}
