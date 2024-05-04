import { PrismaClient } from '@prisma/client'
import { makeProduct } from 'test/factories/make-product'
import { PrismaProductRepository } from './prisma-product-repository'

describe('Prisma Product Repository', async () => {
  let prisma: PrismaClient
  let prismaProductRepository: PrismaProductRepository

  beforeEach(async () => {
    prisma = new PrismaClient()
    prismaProductRepository = new PrismaProductRepository(prisma)
  })

  afterAll(async () => {
    const deleteOrderDetails = prisma.user.deleteMany()
    const deleteProduct = prisma.item.deleteMany()
    const deleteCoverage = prisma.coverage.deleteMany()
    await prisma.$transaction([
      deleteOrderDetails,
      deleteProduct,
      deleteCoverage,
    ])
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should be able to find a list of product', async () => {
    const products = [makeProduct(), makeProduct()]

    await prisma.item.createMany({
      data: products.map((product) => ({
        id: product.id.toString(),
        name: product.name,
        type: 'PRODUCT',
        priceInCents: product.priceInCents,
      })),
    })

    const productsFromDb = await prismaProductRepository.findMany()

    expect(productsFromDb).toHaveLength(2)
  })

  it('should be able to find a product by id', async () => {
    const product = makeProduct()

    await prisma.item.create({
      data: {
        id: product.id.toString(),
        name: product.name,
        type: 'PRODUCT',
        priceInCents: product.priceInCents,
      },
    })

    const productFromDb = await prismaProductRepository.findById(
      product.id.toString(),
    )

    expect(productFromDb).not.toBeNull()
    expect(productFromDb?.id.toString()).toBe(product.id.toString())
  })

  it('should return null if product does not exists', async () => {
    const productFromDb = await prismaProductRepository.findById(
      '6043d145-6096-42c0-8f61-a55858585858',
    )
    expect(productFromDb).toBeNull()
  })
})
