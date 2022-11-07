import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import TransactionsDatasource from './datasource';
import { walletToWalletTransferInput } from './input.type';
import { WalletType } from './type';

@Resolver()
export class WalletResolver extends TransactionsDatasource {
	
	@Authorized('vendor', 'customer', 'HiTable')
	@Mutation(() => String)
	createUserWallet(@Ctx() ctx: MyContext, @Arg('currencyCode') currencyCode: string) {
		const data = {
			userId: ctx.req.user?.userId as string,
			walletCurrencyCode: currencyCode
		};
		return this.createWallet(data);
	}
	
	@Query(() => Number)
	@Authorized('vendor', 'customer', 'HiTable')
	getUserWalletBalance(@Ctx() ctx: MyContext, @Arg('currencyCode') currencyCode: string) {
		const data = {
			userId: ctx.req.user?.userId as string,
			walletCurrencyCode: currencyCode
		}
		return this.getWalletBalance(data);
	}
	
	
	@Query(() => WalletType)
	@Authorized('vendor', 'customer', 'HiTable')
	getUserWalletDetails(@Ctx() ctx: MyContext, @Arg('currencyCode') currencyCode: string) {
		const data = {
			userId: ctx.req.user?.userId as string,
			walletCurrencyCode: currencyCode
		}
		return this.getWalletDetails(data);
	}
	
	
	@Query(() => [WalletType])
	@Authorized('vendor', 'customer', 'HiTable')
	getAllUserActiveWallets(@Ctx() ctx: MyContext) {
		return this.getAllWallet({userId: ctx.req.user?.userId as string});
	}
	

	@Authorized()
	@Mutation(() => String)
	makeWalletToWalletTransfer(@Arg('data') data: walletToWalletTransferInput, @Ctx() ctx: MyContext) {
		// return this.walletToWalletTransfer(data, ctx.req.user?.userId as string);
	}

	@Authorized()
	@Mutation(() => String)
	fundWallet(@Arg('amount') amount: number, @Arg('pin') pin: number, @Ctx() ctx: MyContext) {
		// return this.fundWalletWithStripePaymentLink(ctx.req.user?.userId as string, amount, pin);
	}

	@Authorized()
	@Mutation(() => String)
	getTransactionHistory(@Ctx() ctx: MyContext) {

	};
}
