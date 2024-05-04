import { OffService } from '@/domain/entities/off-service'

export class OffServicesPresenter {
  static toHttp(offServices: OffService) {
    return {
      id: offServices.id.toString(),
      name: offServices.name,
      priceInCents: offServices.priceInCents,
    }
  }
}
