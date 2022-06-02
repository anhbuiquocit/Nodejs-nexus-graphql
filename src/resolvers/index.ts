import { Mutation } from "./Mutation";
import { Query } from "./Query";
import { Type } from "./Type";

// export const resolvers = {
//   Mutation: Mutation,D
//   Query: Query,
//   Type: Type,
// };
export const resolvers = [...Type, ...Query, ...Mutation];
