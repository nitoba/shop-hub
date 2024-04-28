import { Controller, Req, Res } from '@/core/http/controller'
import { z } from 'zod'
import { RegisterUserUseCase } from '@/domain/usecases/register-user'

export const registerUserBodySchema = z.object({
  name: z.string().min(4),
  documentId: z.string().min(11),
  age: z.number().int().min(18).positive(),
  address: z.object({
    city: z.string(),
    state: z.string(),
    number: z.number().int().positive(),
    neighborhood: z.string(),
    street: z.string(),
    zipCode: z.string().regex(/^[0-9]{8}$|^([0-9]{5})[-](0-9]{3})$/),
  }),
})

export const registerUserResponse = z.object({
  userId: z.string().uuid(),
})

export class RegisterUserController extends Controller {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {
    super()
  }

  async handle(request: Req): Promise<Res> {
    const { address, age, documentId, name } = this.validate(
      registerUserBodySchema,
      request.body,
    )

    const result = await this.registerUserUseCase.execute({
      name,
      age,
      documentId,
      address,
    })

    if (result.isLeft()) {
      return this.notFound(result.value)
    }

    return this.created({
      userId: result.value.userId,
    })
  }
}
