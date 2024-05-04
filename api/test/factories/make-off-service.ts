import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OffService } from '@/domain/entities/off-service'
import { ServiceProps } from '@/domain/entities/service'

export function makeOffService(
  override: Partial<ServiceProps> = {},
  id?: UniqueEntityID,
): OffService {
  return OffService.create(
    {
      name: 'Service 1',
      priceInCents: 74100,
      ...override,
    },
    id,
  )
}
