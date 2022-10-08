import {HelloWorldResolver} from "./services/Helloworld/resolver";
import {NonEmptyArray} from "type-graphql/dist/interfaces/NonEmptyArray";

const resolvers:NonEmptyArray<Function> | NonEmptyArray<string> = [
	HelloWorldResolver
];

export default resolvers;

