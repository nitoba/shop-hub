import { InternetService } from '@/domain/entities/internet-service'
import { ItemProps } from '@/domain/entities/item'
import { OffService } from '@/domain/entities/off-service'
import { PackageService } from '@/domain/entities/package-service'
import { Service } from '@/domain/entities/service'
import { ServiceRepository } from '@/domain/repositories/service-repository'

export class InMemoryServiceRepository implements ServiceRepository {
  items: Service[] = []

  async findManyPackage(): Promise<Service<ItemProps>[]> {
    return this.items.filter((service) => {
      if (service instanceof PackageService) {
        return true
      }

      return false
    }) as Service[]
  }

  async findManyByZipCode(zipCode: string): Promise<InternetService[]> {
    const internetServices = this.items.filter((service) => {
      if (service instanceof InternetService) {
        return service.coverage.some((coverage) => coverage.value === zipCode)
      }

      return false
    }) as InternetService[]
    return internetServices
  }

  async findManyOffServices(): Promise<Service[]> {
    return this.items.filter((service) => {
      if (service instanceof OffService) {
        return true
      }

      return false
    }) as OffService[]
  }

  async findById(id: string): Promise<Service | null> {
    const service = this.items.find((service) => service.id.toString() === id)
    return service || null
  }
}
