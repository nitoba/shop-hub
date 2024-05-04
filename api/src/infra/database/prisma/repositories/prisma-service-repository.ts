import { Service } from '@/domain/entities/service'
import { ServiceRepository } from '@/domain/repositories/service-repository'
import { PrismaClient } from '@prisma/client'
import { PrismaServiceMapper } from '../mappers/prisma-service-mapper'
import { InternetService } from '@/domain/entities/internet-service'
import { ItemProps } from '@/domain/entities/item'

export class PrismaServiceRepository implements ServiceRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async findManyOffServices(): Promise<Service<ItemProps>[]> {
    const services = await this.prisma.item.findMany({
      where: {
        type: 'OFF_SERVICE',
      },
    })

    return services.map(PrismaServiceMapper.toOffServiceDomain)
  }

  async findManyPackage(): Promise<Service<ItemProps>[]> {
    const services = await this.prisma.item.findMany({
      where: {
        type: 'PACKAGE',
      },
    })

    return services.map(PrismaServiceMapper.toOffServiceDomain)
  }

  async findManyByZipCode(zipCode: string): Promise<InternetService[]> {
    const internetServices = await this.prisma.item.findMany({
      where: {
        type: 'INTERNET_SERVICE',
        itemsOnCoverage: {
          some: {
            coverage: {
              zipCode: {
                equals: zipCode,
              },
            },
          },
        },
      },
      include: {
        itemsOnCoverage: {
          include: {
            coverage: true,
          },
        },
      },
    })

    return internetServices.map(PrismaServiceMapper.toInternetServiceDomain)
  }

  async findById(id: string): Promise<Service | null> {
    const service = await this.prisma.item.findUnique({
      where: {
        id,
      },
    })

    return service ? PrismaServiceMapper.toOffServiceDomain(service) : null
  }
}
