import { PurchaseItemUseCase } from './purchase-item'
import { ItemNotFoundError } from '../_errors/item-not-found'
import { InMemoryProductRepository } from 'test/repositories/in-memory-product-repository'
import { InMemoryServiceRepository } from 'test/repositories/in-memory-service-repository'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeInternetService } from 'test/factories/make-internet-service'
import { makeProduct } from 'test/factories/make-product'
import { makeUser } from 'test/factories/make-user'
import { InMemoryOrderRepository } from 'test/repositories/in-memory-order-repository'
import { makeOffService } from 'test/factories/make-off-service'

describe('PurchaseItem', () => {
  let productRepository: InMemoryProductRepository
  let serviceRepository: InMemoryServiceRepository
  let userRepository: InMemoryUserRepository
  let orderRepository: InMemoryOrderRepository
  let useCase: PurchaseItemUseCase

  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    serviceRepository = new InMemoryServiceRepository()
    userRepository = new InMemoryUserRepository()
    orderRepository = new InMemoryOrderRepository()
    useCase = new PurchaseItemUseCase(
      productRepository,
      serviceRepository,
      orderRepository,
    )
  })

  it('should return ItemNotFoundError if item does not exist', async () => {
    const user = makeUser()

    userRepository.items.push(user)

    const result = await useCase.execute({
      itemId: 'invalid',
      itemType: 'service',
      userId: user.id.toString(),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ItemNotFoundError)
  })

  it('should create order with internet service', async () => {
    const user = makeUser()
    userRepository.items.push(user)

    const internetService = makeInternetService()
    serviceRepository.items.push(internetService)

    const result = await useCase.execute({
      itemId: internetService.id.toString(),
      itemType: 'service',
      userId: user.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()

    const order = orderRepository.items[0]
    expect(order.userId).toEqual(user.id)
    expect(order.orderItems.length).toBe(1)
    expect(order.orderItems[0].itemId).toEqual(internetService.id)
    expect(order.orderItems[0].price).toBe(internetService.priceInCents)
  })

  it('should create order with product', async () => {
    const user = makeUser()
    userRepository.items.push(user)

    const product = makeProduct()
    productRepository.items.push(product)

    const result = await useCase.execute({
      itemId: product.id.toString(),
      itemType: 'product',
      userId: user.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()

    const order = orderRepository.items[0]
    expect(order.userId).toEqual(user.id)
    expect(order.orderItems.length).toBe(1)
    expect(order.orderItems[0].itemId).toEqual(product.id)
    expect(order.orderItems[0].price).toBe(product.priceInCents)
  })

  it('should create order with service', async () => {
    const user = makeUser()
    userRepository.items.push(user)

    const service = makeOffService()
    serviceRepository.items.push(service)

    const result = await useCase.execute({
      itemId: service.id.toString(),
      itemType: 'service',
      userId: user.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()

    const order = orderRepository.items[0]
    expect(order.userId).toEqual(user.id)
    expect(order.orderItems.length).toBe(1)
    expect(order.orderItems[0].itemId).toEqual(service.id)
    expect(order.orderItems[0].price).toBe(service.priceInCents)
  })
})
