// src/routes/users/index.ts
import { FastifyInstance } from 'fastify';
import { createUserSchema, updateUserSchema } from './schema';
import { createUser, deleteUser, getUser, getUsers, updateUser } from './handler';
import { zodToJsonSchema } from 'zod-to-json-schema';

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      body: zodToJsonSchema(createUserSchema),
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
          required: ['id', 'name', 'email', 'createdAt']
        },
      },
    },
    handler: createUser,
  });

  fastify.get('/', {
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
            },
            required: ['id', 'name', 'email', 'createdAt']
          }
        }
      }
    },
    handler: getUsers,
  });

  fastify.get('/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
          required: ['id', 'name', 'email', 'createdAt']
        }
      }
    },
    handler: getUser,
  });

  fastify.put('/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      },
      body: zodToJsonSchema(updateUserSchema),
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
          required: ['id', 'name', 'email', 'createdAt']
        }
      }
    },
    handler: updateUser,
  });

  fastify.delete('/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      },
      response: {
        204: {
          type: 'null'
        }
      }
    },
    handler: deleteUser,
  });
}