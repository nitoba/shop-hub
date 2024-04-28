import { User } from '../entities/user'

export interface UserRepository {
  findById(id: string): Promise<User | null>
  findByDocumentId(documentId: string): Promise<User | null>
  create(user: User): Promise<void>
}
