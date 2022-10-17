import {AuthResolver} from "./services/auth/resolver";
import {SecurityResolver} from "./services/security/resolver";
import {NonEmptyArray} from "type-graphql/dist/interfaces/NonEmptyArray";

const resolvers:NonEmptyArray<Function> | NonEmptyArray<string> = [
	AuthResolver,
	SecurityResolver
];

export default resolvers;

