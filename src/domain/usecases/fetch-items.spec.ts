import { FetchItemsUseCase } from './fetch-items'
import { ZIPCode } from '../value-objects/zip-code'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository'
import { InvalidZipCodeError } from '../_errors/invalid-zip-code'
import { makeInternetService } from 'test/factories/make-internet-service'
import { makeProduct } from 'test/factories/make-product'
import { makeOffService } from 'test/factories/make-off-service'
import { makePackageService } from 'test/factories/make-package-service'

describe('FetchItemsUseCase', () => {
  let productRepository: InMemoryProductRepository
  let serviceRepository: InMemoryServiceRepository
  let useCase: FetchItemsUseCase

  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    serviceRepository = new InMemoryServiceRepository()
    useCase = new FetchItemsUseCase(productRepository, serviceRepository)
  })

  it('should return an InvalidZipCode error if zip code is invalid', async () => {
    const result = await useCase.execute({ zipCode: 'invalid' })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(InvalidZipCodeError)
  })

  it('should return internet services filtered by zip code', async () => {
    const zipCode = '12345678'
    const inCoverageInternetServices = [
      makeInternetService({
        coverage: [ZIPCode.create({ value: zipCode }).value as ZIPCode],
      }),
      makeInternetService({
        coverage: [ZIPCode.create({ value: zipCode }).value as ZIPCode],
      }),
    ]
    const outOfCoverageInternetService = makeInternetService()

    serviceRepository.items.push(
      ...inCoverageInternetServices,
      outOfCoverageInternetService,
    )

    const result = await useCase.execute({ zipCode })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      const { internetServices } = result.value
      expect(internetServices).toEqual(inCoverageInternetServices)
      expect(internetServices).not.toContain(outOfCoverageInternetService)
    }
  })

  it('should return all products', async () => {
    const products = [makeProduct(), makeProduct()]

    productRepository.items = products

    const result = await useCase.execute({ zipCode: '12345678' })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      const { products: resultProducts } = result.value
      expect(resultProducts).toEqual(products)
    }
  })

  it('should return all services', async () => {
    const services = [
      makeOffService(),
      makeOffService(),
      makeInternetService(),
      makePackageService(),
    ]

    serviceRepository.items = services

    const result = await useCase.execute({ zipCode: '64010090' })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      const { internetServices, offServices, packageServices } = result.value
      expect(internetServices).toHaveLength(1)
      expect(offServices).toHaveLength(2)
      expect(packageServices).toHaveLength(1)
    }
  })
})
