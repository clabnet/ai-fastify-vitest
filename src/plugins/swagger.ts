// src/plugins/swagger.ts
import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

export default fp(async (fastify) => {
  await fastify.register(swagger, {
    swagger: {
      info: {
        title: 'User API',
        description: 'User API documentation',
        version: '1.0.0'
      },
    }
  });

  await fastify.register(swaggerUi, {
    routePrefix: '/swagger',
  });
});