import { UserRepository } from '@/domain/repositories/user-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const ensureAuthenticateHeaderSchema = z.object({
  xuserid: z.string().uuid(),
})

export function ensureAuthenticated(
  router: (request: FastifyRequest, reply: FastifyReply) => Promise<never>,
  userRepository: UserRepository,
) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const { xuserid } = ensureAuthenticateHeaderSchema.parse(req.headers)

    const user = await userRepository.findById(xuserid)

    if (!user) {
      return reply.status(401).send({
        error: {
          message: 'User not authenticated',
        },
      })
    }

    return await router(req, reply)
  }
}
