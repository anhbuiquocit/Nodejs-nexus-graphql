import { createServer } from "@graphql-yoga/node";
import { useErrorHandler, useMaskedErrors } from "@envelop/core";
import { schema } from "./schema";
// import { PrismaClient } from "./generated/prisma-client";
import { PrismaClient } from "@prisma/client";
import { errorMaps } from "./errorMaps";
import { useDisableIntrospection } from "@envelop/disable-introspection";
import express from "express";
import { healthCheck } from "./healthCheck";
import generateErrorHandler from "./fork/back_error_handler";
import { morganLogger } from "./morganLogger";
import "./generated/nexus";
const prisma = new PrismaClient();
const app = express();
const allErrorMaps = [errorMaps];
const formatError = generateErrorHandler({ allErrorMaps });
const graphQLServer = createServer({
  schema,
  context: (req) => {
    const context = {
      ...req,
      prisma,
    };
    return context;
  },
  maskedErrors: false,
  plugins: [
    useMaskedErrors({ formatError }),
    useErrorHandler((error) => {
      // This callback is called per each GraphQLError emitted during execution phase
    }),
  ],
  // plugins: [useDisableIntrospection()],
});
const isDevelopment = process.env.ENV === "development";
const playground = isDevelopment ? "/playground" : false;
// const options = {
//   port: 4000,
//   playground,
//   formatError: (error: any) => {
//     return formatError(error);
//   },
//   bodyParserOptions: { limit: "10mb", type: "application/json" },
// };
healthCheck(app);

morganLogger(app);
app.use("/graphql", graphQLServer);
app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});
