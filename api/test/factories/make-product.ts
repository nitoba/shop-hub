import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Product, ProductProps } from "@/domain/entities/product";

export function makeProduct(override: Partial<ProductProps> = {}, id?: UniqueEntityID): Product {
    return Product.create({
        name: 'Product 1',
        priceInCents: 74100,
        ...override,
    }, id)
}