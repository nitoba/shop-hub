import { User } from "@/domain/entities/user";
import { UserRepository } from "@/domain/repositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
    
    items: User[] = []
    
    async findByDocumentId(documentId: string): Promise<User | null> {
        const user = this.items.find(user => user.documentId === documentId)
        return user || null
    }
    async findById(id: string): Promise<User | null> {
        const user = this.items.find(user => user.id.toString() === id)
        return user || null
    }
    async create(user: User): Promise<void> {
        this.items.push(user)
    }
}