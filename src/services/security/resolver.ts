import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import SecurityDatasource from './datasource';

@Resolver()
export class SecurityResolver extends SecurityDatasource {
	@Authorized()
	@Mutation(() => String)
	createPin(@Arg('pin') pin: number, @Ctx() ctx: MyContext) {
		return this.createTransactionPin(pin, ctx.req.user?.userId as string);
	}
}
