import { FetchItemsUseCase } from '@/domain/usecases/fetch-items'
import { prisma } from '@/infra/database/prisma/client'
import { PrismaProductRepository } from '@/infra/database/prisma/repositories/prisma-product-repository'
import { PrismaServiceRepository } from '@/infra/database/prisma/repositories/prisma-service-repository'
import { FastifyInstance } from 'fastify'
import {
  FetchItemsController,
  fetchItemsQuerySchema,
  fetchItemsResponse,
} from '../../controllers/fetch-items.controller'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { fastifyRouteAdapter } from '../../adapters/fastify-route-adapter'
import {
  ensureAuthenticateHeaderSchema,
  ensureAuthenticated,
} from '../middlewares/ensure-authenticated'
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/prisma-user-repository'
import {
  PurchaseItemController,
  purchaseItemBodySchema,
  purchaseItemParamsSchema,
  purchaseItemResponse,
} from '../../controllers/purchase-item.controller'
import { PurchaseItemUseCase } from '@/domain/usecases/purchase-item'
import { PrismaOrderRepository } from '@/infra/database/prisma/repositories/prisma-order-repository'

export async function itemRouter(app: FastifyInstance) {
  const prismaUserRepository = new PrismaUserRepository(prisma)
  const prismaServicesRepository = new PrismaServiceRepository(prisma)
  const prismaProductsRepository = new PrismaProductRepository(prisma)
  const prismaOrderRepository = new PrismaOrderRepository(prisma)
  const fetchItemsUseCase = new FetchItemsUseCase(
    prismaProductsRepository,
    prismaServicesRepository,
  )

  const purchaseItemUseCase = new PurchaseItemUseCase(
    prismaProductsRepository,
    prismaServicesRepository,
    prismaOrderRepository,
  )

  const fetchItemsController = new FetchItemsController(fetchItemsUseCase)
  const purchaseItemController = new PurchaseItemController(purchaseItemUseCase)

  app.withTypeProvider<ZodTypeProvider>().get(
    '/items',
    {
      schema: {
        summary:
          'Fetch items from catalog, including products, off services and internet services',
        tags: ['Items'],
        querystring: fetchItemsQuerySchema,
        response: {
          200: fetchItemsResponse,
        },
      },
    },
    fastifyRouteAdapter(fetchItemsController),
  )

  app.withTypeProvider<ZodTypeProvider>().post(
    '/items/:itemId/purchase',
    {
      schema: {
        headers: ensureAuthenticateHeaderSchema,
        summary: 'Purchase a item from catalog',
        tags: ['Items'],
        params: purchaseItemParamsSchema,
        body: purchaseItemBodySchema,
        response: {
          201: purchaseItemResponse,
        },
      },
    },
    ensureAuthenticated(
      fastifyRouteAdapter(purchaseItemController),
      prismaUserRepository,
    ),
  )
}
