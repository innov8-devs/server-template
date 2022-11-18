import { NonEmptyArray } from 'type-graphql';
import { AuthResolver } from './services/auth/resolver';

const resolvers: NonEmptyArray<any> | NonEmptyArray<string> = [AuthResolver];

export default resolvers;
