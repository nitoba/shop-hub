import { Either, left, right } from '@/core/either'
import { InvalidZipCodeError } from '../_errors/invalid-zip-code'
import { InternetService } from '../entities/internet-service'
import { Product } from '../entities/product'
import { ZIPCode } from '../value-objects/zip-code'
import { ProductRepository } from '../repositories/product-repository'
import { ServiceRepository } from '../repositories/service-repository'
import { OffService } from '../entities/off-service'
import { PackageService } from '../entities/package-service'

type FetchItemsResponse = Either<
  InvalidZipCodeError,
  {
    internetServices: InternetService[]
    products: Product[]
    offServices: OffService[]
    packageServices: PackageService[]
  }
>

type FetchItemsUseCaseRequest = {
  zipCode: string
}

export class FetchItemsUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async execute({
    zipCode,
  }: FetchItemsUseCaseRequest): Promise<FetchItemsResponse> {
    const zipCodeOrError = ZIPCode.create({ value: zipCode })

    if (zipCodeOrError.isLeft()) {
      return left(zipCodeOrError.value)
    }

    const [internetServices, products, offServices, packageServices] =
      await Promise.all([
        this.serviceRepository.findManyByZipCode(zipCodeOrError.value.value),
        this.productRepository.findMany(),
        this.serviceRepository.findManyOffServices(),
        this.serviceRepository.findManyPackage(),
      ])

    return right({
      internetServices,
      products,
      offServices: offServices as OffService[],
      packageServices: packageServices as PackageService[],
    })
  }
}
