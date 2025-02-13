// Example of another route: src/routes/health/index.ts
import { FastifyPluginAsync } from 'fastify';

const healthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            timestamp: { type: 'string' }
          }
        }
      }
    },
    handler: async () => ({
      status: 'ok',
      timestamp: new Date().toISOString()
    })
  });
};

export default healthRoutes;