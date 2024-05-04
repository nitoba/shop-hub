import { Controller, Req, Res } from '@/core/http/controller'
import { GetItemByIdUseCase } from '@/domain/usecases/get-item-by-id'
import { z } from 'zod'
import { ProductPresenter } from '../presenters/product-presenter'
import { Product } from '@/domain/entities/product'
import { InternetService } from '@/domain/entities/internet-service'
import { PackageService } from '@/domain/entities/package-service'

export const getItemByIdQuerySchema = z.object({
  type: z.enum(['product', 'service']),
})

export const getItemByIdParamsSchema = z.object({
  itemId: z.string().uuid(),
})

export const getItemByIdResponse = z.object({
  id: z.string().uuid(),
  name: z.string(),
  priceInCents: z.number(),
  type: z.enum(['product', 'service']),
})

export class GetItemByIdController extends Controller {
  constructor(private readonly useCase: GetItemByIdUseCase) {
    super()
  }

  async handle(request: Req): Promise<Res> {
    const { type } = this.validate(getItemByIdQuerySchema, request.query)
    const { itemId } = this.validate(getItemByIdParamsSchema, request.params)

    const result = await this.useCase.execute({ itemId, type })

    if (result.isLeft()) {
      return this.badRequest(result.value)
    }

    const response = {
      ...ProductPresenter.toHttp(
        result.value.item as Product | InternetService | PackageService,
      ),
      type,
    }

    return this.ok(response)
  }
}
