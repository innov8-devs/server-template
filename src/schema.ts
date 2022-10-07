import { Query, Mutation } from "./resolvers";
import { GraphQLDateTime } from 'graphql-iso-date';
import GraphQLJSON from 'graphql-type-json';
import typeDefs from"./types";

const resolvers = {
  Query,
  Mutation,
  JSON : GraphQLJSON ,
  DateTime : GraphQLDateTime ,
};

export {
  typeDefs,
  resolvers,
};
