import { Product } from "@/domain/entities/product";
import { ProductRepository } from "@/domain/repositories/product-repository";

export class InMemoryProductRepository implements ProductRepository {
    items: Product[] = []
    async findMany(): Promise<Product[]> {
        return this.items
    }
    async findById(id: string): Promise<Product | null> {
        const product = this.items.find(product => product.id.toString() === id)
        return product || null
    }
    

}