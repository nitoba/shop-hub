import { OffService } from '@/domain/entities/off-service'

export class ProductPresenter {
  static toHttp(product: OffService) {
    return {
      id: product.id.toString(),
      name: product.name,
      priceInCents: product.priceInCents,
    }
  }
}
