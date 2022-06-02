import {
  arg,
  objectType,
  inputObjectType,
  queryType,
  mutationType,
  mutationField,
} from "nexus";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const CreateUserResolver = async (parent, args, context) => {
  console.log("argsUser: ", args);
  //   await prisma.user.create({
  //   });
  return true;
  //   return "CreateUser Successfully!!";
};

export const CreateUserDefinition = mutationField("createUser", {
  type: "Boolean",
  args: {
    data: arg({ type: "UserWhereInput" }),
  },
  resolve: CreateUserResolver,
});
