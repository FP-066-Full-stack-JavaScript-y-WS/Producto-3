import "dotenv/config";
import express from "express";
import cors from "cors";
import { buildSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";

import { schemaString } from "./graphql/schema.js";
import { root } from "./graphql/root.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 4000;

const schema = buildSchema(schemaString);

app.use(cors());

app.all("/graphql", createHandler({
  schema,
  rootValue: root
}));

async function startServer() {
  if (process.env.USE_MEMORY !== "true") {
    await connectDB();
  }

  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
    console.log(`GraphQL en http://localhost:${PORT}/graphql`);
  });
}

startServer();