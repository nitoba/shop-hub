import { PackageService } from '@/domain/entities/package-service'

export class PackageServicesPresenter {
  static toHttp(packageServices: PackageService) {
    return {
      id: packageServices.id.toString(),
      name: packageServices.name,
      priceInCents: packageServices.priceInCents,
    }
  }
}
