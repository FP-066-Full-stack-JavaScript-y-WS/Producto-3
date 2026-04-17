import express from "express";
import cors from "cors";
import { buildSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";

import { schemaString } from "./graphql/schema.js";
import { root } from "./graphql/root.js";

const app = express();
const PORT = 4000;

const schema = buildSchema(schemaString);

app.use(cors());

app.all("/graphql", createHandler({
  schema,
  rootValue: root
}));

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
  console.log(`GraphQL en http://localhost:${PORT}/graphql`);
});