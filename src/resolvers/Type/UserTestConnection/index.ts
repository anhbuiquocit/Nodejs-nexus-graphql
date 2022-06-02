import {
  arg,
  objectType,
  inputObjectType,
  queryType,
  mutationType,
} from "nexus";
import { NexusObjectTypeDef } from "nexus/dist/core";
type Event<T> = {
  data: T;
};

export const UserDefinition: NexusObjectTypeDef<"User"> = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.firstname();
    t.model.phone();
    t.model.createdAt();
    t.model.deletedAt();
    t.model.updatedAt();
    t.model.lastName();
    t.model.email();
  },
});

export const UserQuery: NexusObjectTypeDef<"Query"> = queryType({
  definition(t) {
    t.crud.user();
    t.crud.users({ filtering: true });
  },
});

export const UserMutation: NexusObjectTypeDef<"Mutation"> = mutationType({
  definition(t) {
    t.crud.createOneUser();
    t.crud.deleteOneUser();
    t.crud.updateOneUser();
  },
});
