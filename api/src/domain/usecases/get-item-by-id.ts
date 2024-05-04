import { Either, left, right } from '@/core/either'
import { ProductRepository } from '../repositories/product-repository'
import { ServiceRepository } from '../repositories/service-repository'
import { ItemNotFoundError } from '../_errors/item-not-found'
import { Product } from '../entities/product'
import { Service } from '../entities/service'

type GetItemByIdResponse = Either<
  ItemNotFoundError,
  {
    item: Product | Service
  }
>

type GetItemByIdUseCaseRequest = {
  itemId: string
  type: 'product' | 'service'
}

export class GetItemByIdUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly serviceRepository: ServiceRepository,
  ) {}

  async execute({
    itemId,
    type,
  }: GetItemByIdUseCaseRequest): Promise<GetItemByIdResponse> {
    if (type === 'product') {
      const product = await this.productRepository.findById(itemId)

      if (product) {
        return right({
          item: product,
        })
      }
    }

    if (type === 'service') {
      const service = await this.serviceRepository.findById(itemId)

      if (service) {
        return right({
          item: service,
        })
      }
    }

    return left(new ItemNotFoundError(itemId))
  }
}
