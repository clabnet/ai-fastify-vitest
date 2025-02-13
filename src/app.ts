// src/app.ts
import Fastify, { FastifyInstance } from 'fastify';
import userRoutes from './routes/users';
import swagger from './plugins/swagger';
import autoload from './plugins/autoload';

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: true,
  });

  // Register autoload plugin
  app.register(autoload);

  // Register plugins
  // app.register(swagger);

  return app;
}
