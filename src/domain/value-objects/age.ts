import { Either, left, right } from '@/core/either'
import { ValueObject } from '@/core/entities/value-objects'
import { InvalidAgeError } from '../_errors/invalid-age'

export type AgeProps = {
  value: number
}

export class Age extends ValueObject<AgeProps> {
  get value(): number {
    return this.props.value
  }

  private validate(age: number): boolean {
    return age >= 18
  }

  static create(props: AgeProps): Either<InvalidAgeError, Age> {
    const age = new Age(props)

    if (!age.validate(props.value)) {
      return left(new InvalidAgeError(props.value))
    }

    return right(age)
  }
}
