import { InternetService } from '../entities/internet-service'
import { Service } from '../entities/service'

export type ServiceType = 'off-service' | 'internet-service'

export interface ServiceRepository {
  findManyOffServices(): Promise<Service[]>
  findManyPackage(): Promise<Service[]>
  findById(id: string): Promise<Service | null>
  findManyByZipCode(zipCode: string): Promise<InternetService[]>
}
