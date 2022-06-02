// import { makeExecutableSchema } from "@graphql-tools/schema";
import { makeSchema, objectType, inputObjectType, asNexusMethod } from "nexus";
import { resolvers } from "./resolvers";
import { DateTimeResolver, JSONObjectResolver } from "graphql-scalars";
import { nexusPrisma } from "nexus-plugin-prisma";
import path from "path";
import { NexusGraphQLSchema } from "nexus/dist/core";
import { PrismaClient } from "@prisma/client";

export const DateTime = asNexusMethod(DateTimeResolver, "date");

export const schema: NexusGraphQLSchema = makeSchema({
  types: [resolvers, DateTime, JSONObjectResolver],
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: __dirname + "/generated/schema.graphql",
    typegen: __dirname + "/generated/nexus.ts",
    
  },
  contextType: {
    module: require.resolve("./context"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      // {
      //   module: '@prisma/client',
      //   alias: 'prisma',
      // },
      {
        module: require.resolve("@prisma/client/index.d.ts"),
        alias: "prisma",
      },
    ],
  },
});
