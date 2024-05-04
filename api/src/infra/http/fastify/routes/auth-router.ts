import { RegisterUserUseCase } from '@/domain/usecases/register-user'
import { prisma } from '@/infra/database/prisma/client'
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/prisma-user-repository'
import { FastifyInstance } from 'fastify'
import {
  RegisterUserController,
  registerUserBodySchema,
  registerUserResponse,
} from '../../controllers/register-user.controller'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { fastifyRouteAdapter } from '../../adapters/fastify-route-adapter'

export async function authRouter(app: FastifyInstance) {
  const prismaUserRepository = new PrismaUserRepository(prisma)
  const registerUserUseCase = new RegisterUserUseCase(prismaUserRepository)
  const registerUserController = new RegisterUserController(registerUserUseCase)

  app.withTypeProvider<ZodTypeProvider>().post(
    '/auth/register',
    {
      schema: {
        summary: 'Register a new user',
        tags: ['Auth'],
        body: registerUserBodySchema,
        response: {
          201: registerUserResponse,
        },
      },
    },
    fastifyRouteAdapter(registerUserController),
  )
}
