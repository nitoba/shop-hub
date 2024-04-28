import { PrismaClient } from '@prisma/client'

import { makeOrder } from 'test/factories/make-order'
import { PrismaOrderRepository } from './prisma-order-repository'
import { makeProduct } from 'test/factories/make-product'
import { OrderItem } from '@/domain/entities/order-item'
import { makeUser } from 'test/factories/make-user'

describe('Prisma Order Repository', async () => {
  let prisma: PrismaClient
  let prismaOrderRepository: PrismaOrderRepository

  beforeEach(async () => {
    prisma = new PrismaClient()
    prismaOrderRepository = new PrismaOrderRepository(prisma)
  })

  afterAll(async () => {
    const deleteOrderDetails = prisma.user.deleteMany()
    const deleteService = prisma.item.deleteMany()
    const deleteCoverage = prisma.coverage.deleteMany()
    const deleteOrders = prisma.order.deleteMany()
    await prisma.$transaction([
      deleteOrderDetails,
      deleteService,
      deleteCoverage,
      deleteOrders,
    ])
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should be able to find a order by id', async () => {
    const user = makeUser()
    const item = makeProduct()
    const order = makeOrder({
      userId: user.id,
      orderItems: [
        OrderItem.create({
          itemId: item.id,
          price: item.priceInCents,
          quantity: 1,
        }),
      ],
    })

    await prisma.item.create({
      data: {
        id: item.id.toString(),
        name: item.name,
        priceInCents: item.priceInCents,
        type: 'OFF_SERVICE',
      },
    })

    await prisma.user.create({
      data: {
        id: user.id.toString(),
        name: user.name,
        age: user.age.value,
        documentId: user.documentId,
        city: user.address.city,
        neighborhood: user.address.neighborhood,
        number: user.address.number,
        state: user.address.state,
        street: user.address.street,
        zipCode: user.address.zipCode.value,
      },
    })

    await prisma.order.create({
      data: {
        id: order.id.toString(),
        totalPriceInCents: order.orderItems.reduce(
          (acc, item) => (acc += item.price),
          0,
        ),
        itemId: order.orderItems[0].itemId.toString(),
        userId: order.userId.toString(),
      },
    })

    const orderFromDb = await prismaOrderRepository.findById(
      order.id.toString(),
    )

    expect(orderFromDb).not.toBeNull()
    expect(orderFromDb?.id).toEqual(order.id)
  })

  it('should be able to create a new order', async () => {
    const user = makeUser()
    const item = makeProduct()
    const order = makeOrder({
      userId: user.id,
      orderItems: [
        OrderItem.create({
          itemId: item.id,
          price: item.priceInCents,
          quantity: 1,
        }),
      ],
    })

    await prisma.item.create({
      data: {
        id: item.id.toString(),
        name: item.name,
        priceInCents: item.priceInCents,
        type: 'OFF_SERVICE',
      },
    })

    await prisma.user.create({
      data: {
        id: user.id.toString(),
        name: user.name,
        age: user.age.value,
        documentId: user.documentId,
        city: user.address.city,
        neighborhood: user.address.neighborhood,
        number: user.address.number,
        state: user.address.state,
        street: user.address.street,
        zipCode: user.address.zipCode.value,
      },
    })

    await prismaOrderRepository.create(order)

    const orderFromDb = await prisma.order.findUnique({
      where: {
        id: order.id.toString(),
      },
    })

    expect(orderFromDb).not.toBeNull()
    expect(orderFromDb?.id).toEqual(order.id.toString())
  })
})
