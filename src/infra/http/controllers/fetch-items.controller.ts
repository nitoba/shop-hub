import { Controller, Req, Res } from '@/core/http/controller'
import { FetchItemsUseCase } from '@/domain/usecases/fetch-items'
import { z } from 'zod'
import { InternetServicePresenter } from '../presenters/internet-services-presenter'
import { OffServicesPresenter } from '../presenters/off-services-presenter'
import { ProductPresenter } from '../presenters/product-presenter'

export const fetchItemsQuerySchema = z.object({
  zipCode: z.string(),
})

export const fetchItemsResponse = z.object({
  services: z.object({
    internet: z.array(
      z.object({
        id: z.string().uuid(),
        name: z.string(),
        priceInCents: z.number(),
      }),
    ),
    off_one: z.array(
      z.object({
        id: z.string().uuid(),
        name: z.string(),
        priceInCents: z.number(),
      }),
    ),
  }),
  products: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      priceInCents: z.number(),
    }),
  ),
})

export class FetchItemsController extends Controller {
  constructor(private readonly useCase: FetchItemsUseCase) {
    super()
  }

  async handle(request: Req): Promise<Res> {
    const { zipCode } = this.validate(fetchItemsQuerySchema, request.query)

    const result = await this.useCase.execute({ zipCode })

    if (result.isLeft()) {
      return this.badRequest(result.value)
    }

    const response = {
      services: {
        internet: result.value.internetServices.map(
          InternetServicePresenter.toHttp,
        ),
        off_one: result.value.offServices.map(OffServicesPresenter.toHttp),
      },
      products: result.value.products.map(ProductPresenter.toHttp),
    }

    return this.ok(response)
  }
}
