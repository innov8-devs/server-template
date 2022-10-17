import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import SecurityDatasource from './datasource';

@Resolver()
export class SecurityResolver extends SecurityDatasource {
	@Authorized()
	@Mutation(() => String)
	createPin(@Arg('pin') pin: number) {
		return 'Hello World';
		return this.createTransactionPin(pin, '5e7f1b9b0f9a9c0b8c8b8b8b');
	}
}
