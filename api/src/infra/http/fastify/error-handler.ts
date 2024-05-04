import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'
import { fromError } from 'zod-validation-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    console.log(error)
    return reply.status(400).send({
      error: {
        message: fromError(error).message,
      },
    })
  }

  return reply.status(500).send({ message: 'Internal server error!' })
}
