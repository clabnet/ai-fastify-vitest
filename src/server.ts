// src/server.ts
import { buildApp } from './app';

const app = buildApp();
const PORT = process.env.PORT || 3000;

app.listen({ port: Number(PORT) }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});