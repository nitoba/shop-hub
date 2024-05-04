import { InternetService } from '@/domain/entities/internet-service'
import { PackageService } from '@/domain/entities/package-service'
import { Product } from '@/domain/entities/product'

export class ItemPresenter {
  static toHttp(item: Product | InternetService | PackageService) {
    return {
      id: item.id.toString(),
      name: item.name,
      priceInCents: item.priceInCents,
    }
  }
}
