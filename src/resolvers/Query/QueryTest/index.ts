import { arg, extendType, stringArg } from "nexus";
import { NexusExtendTypeDef } from "nexus/dist/core";
import { type } from "os";
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const queryTestResolver = async (parent, args, context) => {
  try {
    const ListUser = await prisma.user.findMany();
    console.log("ListUser", ListUser);
    return ListUser;
  } catch (err) {
    console.log(err);
  }
};

export const queryTestDefinition: NexusExtendTypeDef<any> = extendType({
  type: "Query",
  definition: (t) => {
    t.nullable.list.field("queryTest", {
      type: "User",
      args: {
        user: arg({ type: "UserWhereInput" }),
      },
      resolve: queryTestResolver,
    });
  },
});
