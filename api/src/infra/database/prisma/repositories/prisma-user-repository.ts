import { User } from '@/domain/entities/user'
import { UserRepository } from '@/domain/repositories/user-repository'
import { PrismaClient } from '@prisma/client'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user ? PrismaUserMapper.toDomain(user) : null
  }

  async findByDocumentId(documentId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        documentId,
      },
    })

    return user ? PrismaUserMapper.toDomain(user) : null
  }

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
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
  }
}
