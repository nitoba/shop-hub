import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  PackageService,
  PackageServiceProps,
} from '@/domain/entities/package-service'

export function makePackageService(
  override: Partial<PackageServiceProps> = {},
  id?: UniqueEntityID,
) {
  return PackageService.create(
    {
      name: 'Combo',
      priceInCents: 99_990,
      ...override,
    },
    id,
  )
}
