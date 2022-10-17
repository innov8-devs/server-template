import {AuthResolver} from "./services/auth/resolver";
import {NonEmptyArray} from "type-graphql/dist/interfaces/NonEmptyArray";

const resolvers:NonEmptyArray<Function> | NonEmptyArray<string> = [
	AuthResolver
];

export default resolvers;

