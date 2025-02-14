// src/plugins/autoload.ts
import autoload from '@fastify/autoload'
import fp from 'fastify-plugin'

import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default fp(async (fastify) => {
  // Load all plugins
  await fastify.register(autoload, {
    dir: path.join(__dirname),
    ignorePattern: /autoload\.ts/,
    options: {}
  })

  // Load all routes
  await fastify.register(autoload, {
    dir: path.join(process.cwd(), '/src/routes'),
    // options: { prefix: '/api' },
    indexPattern: /index\.ts$/
  })
})
