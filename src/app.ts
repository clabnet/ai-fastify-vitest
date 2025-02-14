// src/app.ts
import Fastify, { FastifyInstance } from 'fastify'

import autoload from './plugins/autoload'

// import swagger from './plugins/swagger'
// import healthRoutes from './routes/health'
// import userRoutes from './routes/users'

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: true
  })

  // Register plugins
  // app.register(swagger);

  // Register routes
  // app.register(userRoutes, { prefix: '/users' });
  // app.register(healthRoutes, { prefix: '/health' });

  // Register autoload plugin
  app.register(autoload)

  return app
}
