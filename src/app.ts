// src/app.ts
import Fastify, { FastifyInstance } from 'fastify';
import userRoutes from './routes/users';
import swagger from './plugins/swagger';

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: true,
  });

  // Register plugins
  app.register(swagger);

  // Register routes
  app.register(userRoutes, { prefix: '/users' });

  return app;
}
