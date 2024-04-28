import { Product } from '../entities/product'

export interface ProductRepository {
  findMany(): Promise<Product[]>
  findById(id: string): Promise<Product | null>
}
