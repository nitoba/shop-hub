import { PrismaClient } from '@prisma/client'
import { makeInternetService } from 'test/factories/make-internet-service'
import { PrismaServiceRepository } from './prisma-service-repository'
import { makeOffService } from 'test/factories/make-off-service'
import { ZIPCode } from '@/domain/value-objects/zip-code'

describe('Prisma Service Repository', async () => {
  let prisma: PrismaClient
  let prismaServiceRepository: PrismaServiceRepository

  beforeEach(async () => {
    prisma = new PrismaClient()
    prismaServiceRepository = new PrismaServiceRepository(prisma)
  })

  afterAll(async () => {
    const deleteOrderDetails = prisma.user.deleteMany()
    const deleteService = prisma.item.deleteMany()
    const deleteCoverage = prisma.coverage.deleteMany()
    await prisma.$transaction([
      deleteOrderDetails,
      deleteService,
      deleteCoverage,
    ])
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should be able to a list of internet services by zipCode', async () => {
    const services = [
      makeInternetService({
        coverage: [
          ZIPCode.create({
            value: '12345678',
          }).value as ZIPCode,
        ],
      }),
      makeInternetService(),
    ]

    await prisma.coverage.create({
      data: {
        zipCode: '12345678',
        itemsOnCoverage: {
          create: {
            item: {
              create: {
                id: services[0].id.toString(),
                name: services[0].name,
                priceInCents: services[0].priceInCents,
                type: 'INTERNET_SERVICE',
              },
            },
          },
        },
      },
    })

    await prisma.coverage.create({
      data: {
        zipCode: '64010100',
        itemsOnCoverage: {
          create: {
            item: {
              create: {
                id: services[1].id.toString(),
                name: services[1].name,
                priceInCents: services[1].priceInCents,
                type: 'INTERNET_SERVICE',
              },
            },
          },
        },
      },
    })

    const servicesFromDb =
      await prismaServiceRepository.findManyByZipCode('12345678')

    expect(servicesFromDb).toHaveLength(1)
  })

  it('should be able to a list of off services', async () => {
    const services = [makeOffService(), makeOffService()]

    await prisma.item.createMany({
      data: services.map((service) => ({
        id: service.id.toString(),
        name: service.name,
        type: 'OFF_SERVICE',
        priceInCents: service.priceInCents,
      })),
    })

    const servicesFromDb = await prismaServiceRepository.findManyOffServices()

    expect(servicesFromDb).toHaveLength(2)
  })

  it('should be able to find a off service by id', async () => {
    const service = makeOffService()

    await prisma.item.create({
      data: {
        id: service.id.toString(),
        name: service.name,
        type: 'OFF_SERVICE',
        priceInCents: service.priceInCents,
      },
    })

    const serviceFromDb = await prismaServiceRepository.findById(
      service.id.toString(),
    )

    expect(serviceFromDb).not.toBeNull()
    expect(serviceFromDb?.id.toString()).toBe(service.id.toString())
  })
})
