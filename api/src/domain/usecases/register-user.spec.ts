import { RegisterUserUseCase } from './register-user'
import { InvalidZipCodeError } from '../_errors/invalid-zip-code'
import { InvalidAgeError } from '../_errors/invalid-age'
import { Age } from '../value-objects/age'
import { User } from '../entities/user'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'

describe('RegisterUserUseCase', () => {
  let userRepository: InMemoryUserRepository
  let useCase: RegisterUserUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    useCase = new RegisterUserUseCase(userRepository)
  })

  it('should return InvalidZipCodeError if zip code is invalid', async () => {
    const result = await useCase.execute({
      name: 'John Doe',
      documentId: '1234',
      age: 30,
      address: {
        street: 'Main St',
        number: 123,
        neighborhood: 'Downtown',
        city: 'Anytown',
        state: 'CA',
        zipCode: 'invalid',
      },
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(InvalidZipCodeError)
  })

  it('should return InvalidAgeError if age is invalid', async () => {
    const result = await useCase.execute({
      name: 'John Doe',
      documentId: '1234',
      age: -1,
      address: {
        street: 'Main St',
        number: 123,
        neighborhood: 'Downtown',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345678',
      },
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(InvalidAgeError)
  })

  it('should create user if request is valid', async () => {
    const result = await useCase.execute({
      name: 'John Doe',
      documentId: '1234',
      age: 30,
      address: {
        street: 'Main St',
        number: 123,
        neighborhood: 'Downtown',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345678',
      },
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      const user = userRepository.items[0]
      expect(user).toBeInstanceOf(User)
      expect(user.name).toBe('John Doe')
      expect(user.documentId).toBe('1234')
      expect(user.age).toEqual(Age.create({ value: 30 }).value)
    }
  })
})
