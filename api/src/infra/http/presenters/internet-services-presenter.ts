import { InternetService } from '@/domain/entities/internet-service'

export class InternetServicePresenter {
  static toHttp(internetServices: InternetService) {
    return {
      id: internetServices.id.toString(),
      name: internetServices.name,
      priceInCents: internetServices.priceInCents,
    }
  }
}
