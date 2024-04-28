import { PrismaClient } from '@prisma/client'
import { makeUser } from 'test/factories/make-user'
import { PrismaUserRepository } from './prisma-user-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

describe('Prisma User Repository', async () => {
  let prisma: PrismaClient
  let prismaUserRepository: PrismaUserRepository

  beforeEach(async () => {
    prisma = new PrismaClient()
    prismaUserRepository = new PrismaUserRepository(prisma)
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

  it('should be able to create a new user', async () => {
    const user = makeUser()

    await prismaUserRepository.create(user)

    const userFromDb = await prisma.user.findUnique({
      where: {
        id: user.id.toString(),
      },
    })

    expect(userFromDb).not.toBeNull()
  })

  it('should be able to find a user by id', async () => {
    const userId = new UniqueEntityID()
    const user = makeUser(undefined, userId)

    await prisma.user.create({
      data: {
        id: userId.toString(),
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

    const userFromDb = await prismaUserRepository.findById(userId.toString())

    expect(userFromDb).not.toBeNull()
    expect(userFromDb?.id.toString()).toBe(userId.toString())
  })

  it('should be able to find a user by documentId', async () => {
    const user = makeUser()

    await prismaUserRepository.create(user)

    const userFromDb = await prismaUserRepository.findByDocumentId(
      user.documentId,
    )

    expect(userFromDb).not.toBeNull()
    expect(userFromDb?.documentId).toBe(user.documentId)
  })

  it('should return null if user does not exists', async () => {
    const userFromDb = await prismaUserRepository.findById(
      '6043d145-6096-42c0-8f61-a55858585858',
    )

    expect(userFromDb).toBeNull()
  })
})
