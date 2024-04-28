import { Either, left, right } from '@/core/either'
import { UserRepository } from '../repositories/user-repository'
import { InvalidZipCodeError } from '../_errors/invalid-zip-code'
import { InvalidAgeError } from '../_errors/invalid-age'
import { ZIPCode } from '../value-objects/zip-code'
import { Age } from '../value-objects/age'
import { User } from '../entities/user'
import { Address } from '../value-objects/address'

type RegisterUserRequest = {
  name: string
  documentId: string
  age: number
  address: {
    street: string
    number: number
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
}

type RegisterUserResponse = Either<
  InvalidZipCodeError | InvalidAgeError,
  {
    userId: string
  }
>

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    address,
    age,
    documentId,
    name,
  }: RegisterUserRequest): Promise<RegisterUserResponse> {
    const zipCode = address.zipCode

    const isValidZipCode = ZIPCode.create({ value: zipCode })

    if (isValidZipCode.isLeft()) {
      return left(isValidZipCode.value)
    }

    const isValidAge = Age.create({ value: age })

    if (isValidAge.isLeft()) {
      return left(isValidAge.value)
    }

    const userAlreadyExists =
      await this.userRepository.findByDocumentId(documentId)

    if (userAlreadyExists) {
      return right({
        userId: userAlreadyExists.id.toString(),
      })
    }

    const user = User.create({
      name,
      documentId,
      age: isValidAge.value,
      address: Address.create({
        street: address.street,
        number: address.number,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        zipCode: isValidZipCode.value,
      }),
    })

    await this.userRepository.create(user)

    return right({
      userId: user.id.toString(),
    })
  }
}
