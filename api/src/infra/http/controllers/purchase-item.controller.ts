import { Controller, Req, Res } from '@/core/http/controller'
import { z } from 'zod'
import { PurchaseItemUseCase } from '@/domain/usecases/purchase-item'
import { ensureAuthenticateHeaderSchema } from '../fastify/middlewares/ensure-authenticated'

export const purchaseItemParamsSchema = z.object({
  itemId: z.string().uuid(),
})

export const purchaseItemBodySchema = z.object({
  itemType: z.enum(['product', 'service']),
})

export const purchaseItemResponse = z.object({
  orderId: z.string().uuid(),
})

export class PurchaseItemController extends Controller {
  constructor(private readonly purchaseItemUseCase: PurchaseItemUseCase) {
    super()
  }

  async handle(request: Req): Promise<Res> {
    const { itemId } = this.validate(purchaseItemParamsSchema, request.params)
    const { itemType } = this.validate(purchaseItemBodySchema, request.body)
    const { xuserid: userId } = this.validate(
      ensureAuthenticateHeaderSchema,
      request.headers,
    )

    const result = await this.purchaseItemUseCase.execute({
      itemId,
      itemType,
      userId,
    })

    if (result.isLeft()) {
      return this.notFound(result.value)
    }

    return this.created({
      orderId: result.value.orderId,
    })
  }
}
