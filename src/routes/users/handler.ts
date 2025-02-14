// src/routes/users/handler.ts
import crypto from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'

import { CreateUserSchema, UpdateUserSchema } from './schema'

const users = new Map<string, any>()

export async function createUser(
  request: FastifyRequest<{ Body: CreateUserSchema }>,
  reply: FastifyReply
) {
  const id = crypto.randomUUID()
  const user = {
    id,
    ...request.body,
    createdAt: new Date()
  }
  users.set(id, user)
  return reply.code(201).send(user)
}

export async function getUsers() {
  return Array.from(users.values())
}

export async function getUser(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const user = users.get(request.params.id)
  if (!user) {
    return reply.code(404).send({ message: 'User not found' })
  }
  return user
}

export async function updateUser(
  request: FastifyRequest<{ Params: { id: string }; Body: UpdateUserSchema }>,
  reply: FastifyReply
) {
  const user = users.get(request.params.id)
  if (!user) {
    return reply.code(404).send({ message: 'User not found' })
  }

  const updatedUser = {
    ...user,
    ...request.body
  }
  users.set(request.params.id, updatedUser)
  return updatedUser
}

export async function deleteUser(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const user = users.get(request.params.id)
  if (!user) {
    return reply.code(404).send({ message: 'User not found' })
  }
  users.delete(request.params.id)
  return reply.code(204).send()
}
