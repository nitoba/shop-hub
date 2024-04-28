import fastify, { type FastifyInstance } from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastifyCors from '@fastify/cors'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { Server } from '@/core/http/server'
import { itemRouter } from './routes/item-router'
import { authRouter } from './routes/auth-router'
import { errorHandler } from './error-handler'

export class FastifyServer implements Server {
  private server: FastifyInstance

  constructor() {
    this.server = fastify()
    this.addCors()
    this.addSwagger()
    this.registerRoutes()
  }

  private registerRoutes() {
    this.server.register(authRouter)
    this.server.register(itemRouter)

    this.server.setErrorHandler(errorHandler)
  }

  private addSwagger() {
    this.server.register(fastifySwagger, {
      mode: 'dynamic',
      swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
          title: 'Catalog From Items',
          description:
            'Specifications from API to manage an application for view items from catalog and purchase then',
          version: '1.0.0',
        },
      },
      transform: jsonSchemaTransform,
    })

    this.server.register(fastifySwaggerUI, {
      routePrefix: '/docs',
    })
    this.server.setValidatorCompiler(validatorCompiler)
    this.server.setSerializerCompiler(serializerCompiler)
  }

  private addCors() {
    this.server.register(fastifyCors, {
      origin: '*',
    })
  }

  listen(port: number): void {
    this.server
      .listen({
        host: '0.0.0.0',
        port,
      })
      .then((address) => {
        console.log(`🚀 Server is running on: ${address}`)
      })
      .catch((error) => {
        console.error(`❌ Server is not running: ${error.message}`)
        process.exit(1)
      })
  }

  async close(): Promise<void> {
    await this.server.close()
  }
}
