// src/plugins/autoload.ts
import fp from 'fastify-plugin';
import autoload from '@fastify/autoload';
import path from 'path';

export default fp(async (fastify) => {
  // Load all plugins
  await fastify.register(autoload, {
    dir: path.join(__dirname),
    ignorePattern: /autoload\.ts/,
    options: {}
  });

  // Load all routes
  await fastify.register(autoload, {
    dir: path.join(__dirname, '../routes'),
    options: { prefix: '/api' },
    // Only load files that match this pattern
    routePattern: /index\.ts$/
  });
});