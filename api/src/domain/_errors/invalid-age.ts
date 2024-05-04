export class InvalidAgeError extends Error {
  constructor(age: number) {
    super(
      `Invalid age: ${age}. Age must be greater than or equal 18 years old.`,
    )
  }
}
