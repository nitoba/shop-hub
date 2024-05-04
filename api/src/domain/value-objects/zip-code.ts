import { Either, left, right } from '@/core/either'
import { ValueObject } from '@/core/entities/value-objects'
import { InvalidZipCodeError } from '../_errors/invalid-zip-code'

type Props = {
  value: string
}

export class ZIPCode extends ValueObject<Props> {
  get value(): string {
    return this.props.value
  }

  private validate(zipCode: string): boolean {
    const regexCEP: RegExp = /^[0-9]{8}$|^([0-9]{5})[-](0-9]{3})$/
    return regexCEP.test(zipCode)
  }

  static create(props: Props): Either<InvalidZipCodeError, ZIPCode> {
    const zipCode = new ZIPCode(props)

    if (!zipCode.validate(props.value)) {
      return left(new InvalidZipCodeError())
    }

    return right(zipCode)
  }
}
