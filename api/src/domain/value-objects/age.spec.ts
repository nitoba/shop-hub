import { Age, AgeProps } from './age'
import { InvalidAgeError } from '../_errors/invalid-age'
import { left, right } from '@/core/either'

describe('Age', () => {
  it('should create a valid Age', () => {
    const ageProps: AgeProps = { value: 25 }
    const result = Age.create(ageProps)
    expect(result).toEqual(right(expect.any(Age)))
  })

  it('should return InvalidAgeError for age below 18', () => {
    const ageProps: AgeProps = { value: 15 }
    const result = Age.create(ageProps)
    expect(result).toEqual(left(new InvalidAgeError(ageProps.value)))
  })

  it('should return InvalidAgeError for invalid age', () => {
    const ageProps: AgeProps = { value: -10 }
    const result = Age.create(ageProps)
    expect(result).toEqual(left(new InvalidAgeError(ageProps.value)))
  })
})
