import { ZIPCode } from './zip-code'
import { InvalidZipCodeError } from '../_errors/invalid-zip-code'
import { left, right } from '@/core/either'

describe('ZIPCode', () => {
  it('should create a valid ZIPCode', () => {
    const result = ZIPCode.create({ value: '05484900' })
    expect(result).toEqual(right(expect.any(ZIPCode)))
  })

  it('should return InvalidZipCode error for invalid ZIP code', () => {
    const result = ZIPCode.create({ value: '1234' })
    expect(result).toEqual(left(new InvalidZipCodeError()))
  })
})
