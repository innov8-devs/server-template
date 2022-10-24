import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import TransactionsDatasource from './datasource';
import { walletToWalletTransferInput } from './type';

@Resolver()
export class TransactionsResolver extends TransactionsDatasource {
	@Authorized()
	@Mutation(() => String)
	createUserWallet(@Arg('pin') pin: number, @Ctx() ctx: MyContext) {
		return this.createWallet(ctx.req.user?.userId as string);
	}

	@Authorized()
	@Query(() => Number)
	getUserWalletBalance(@Ctx() ctx: MyContext) {
		return this.getWalletBalance(ctx.req.user?.userId as string);
	}

	@Authorized()
	@Mutation(() => String)
	makeWalletToWalletTransfer(@Arg('data') data: walletToWalletTransferInput, @Ctx() ctx: MyContext) {
		return this.walletToWalletTransfer(data, ctx.req.user?.userId as string);
	}

	@Authorized()
	@Mutation(() => String)
	fundWallet(@Arg('amount') amount: number, @Arg('pin') pin: number, @Ctx() ctx: MyContext) {
		return this.fundWalletWithStripePaymentLink(ctx.req.user?.userId as string, amount, pin);
	}

	@Authorized()
	@Mutation(() => String)
	getTransactionHistory(@Ctx() ctx: MyContext) {

	};
}
