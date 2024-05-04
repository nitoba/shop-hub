import { Product } from '@/domain/entities/product'
import { ProductRepository } from '@/domain/repositories/product-repository'
import { PrismaClient } from '@prisma/client'
import { PrismaProductMapper } from '../mappers/prisma-product-mapper'

export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findMany(): Promise<Product[]> {
    const products = await this.prisma.item.findMany({
      where: {
        type: 'PRODUCT',
      },
    })

    return products.map(PrismaProductMapper.toDomain)
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.item.findUnique({
      where: {
        id,
        type: 'PRODUCT',
      },
    })

    return product ? PrismaProductMapper.toDomain(product) : null
  }
}
