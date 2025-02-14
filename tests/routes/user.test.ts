// tests/routes/users.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { FastifyInstance } from 'fastify';
import { buildApp } from '../../src/app';

describe('User Routes', () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = buildApp();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should create a new user', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name: 'Claudio Barca',
        email: 'john@example.com',
      },
    });

    expect(response.statusCode).toBe(201);
    const user = JSON.parse(response.payload);
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Claudio Barca');
    expect(user.email).toBe('john@example.com');
  });

  it('should get all users', async () => {
    // Create a test user first
    await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    });

    const response = await app.inject({
      method: 'GET',
      url: '/users',
    });

    expect(response.statusCode).toBe(200);
    const users = JSON.parse(response.payload);
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  it('should get a single user', async () => {
    // Create a test user first
    const createResponse = await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    });
    const createdUser = JSON.parse(createResponse.payload);

    const response = await app.inject({
      method: 'GET',
      url: `/users/${createdUser.id}`,
    });

    expect(response.statusCode).toBe(200);
    const user = JSON.parse(response.payload);
    expect(user.id).toBe(createdUser.id);
  });

  it('should update a user', async () => {
    // Create a test user first
    const createResponse = await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    });
    const createdUser = JSON.parse(createResponse.payload);

    const response = await app.inject({
      method: 'PUT',
      url: `/users/${createdUser.id}`,
      payload: {
        name: 'Jane Doe',
      },
    });

    expect(response.statusCode).toBe(200);
    const user = JSON.parse(response.payload);
    expect(user.name).toBe('Jane Doe');
    expect(user.email).toBe('john@example.com');
  });

  it('should delete a user', async () => {
    // Create a test user first
    const createResponse = await app.inject({
      method: 'POST',
      url: '/users',
      payload: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    });
    const createdUser = JSON.parse(createResponse.payload);

    const response = await app.inject({
      method: 'DELETE',
      url: `/users/${createdUser.id}`,
    });

    expect(response.statusCode).toBe(204);
  });
});
