import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import TransactionsDatasource from './datasource';
import {
	initFundWalletWithStripType,
	initFundWalletWithStripInput,
	confirmFundWalletWithStripInput, getTransactionListInput
} from './input.type';
import { TransactionsType } from './type';


@Resolver()
export class TransactionsResolver extends TransactionsDatasource {
	@Authorized('vendor', 'customer', 'HiTable')
	@Mutation(() => initFundWalletWithStripType)
	userInitFundWalletWithStrip(@Arg('data') data: initFundWalletWithStripInput, @Ctx() ctx: MyContext) {
		const { amount, walletCurrencyCode } = data;
		return this.initFundWalletWithStripe({ amount, walletCurrencyCode }, ctx.req.user?.userId as string);
	}
	
	@Authorized('vendor', 'customer', 'HiTable')
	@Mutation(() => initFundWalletWithStripType)
	userConfirmFundWalletWithStrip(@Arg('data') data: confirmFundWalletWithStripInput, @Ctx() ctx: MyContext) {
		return this.confirmFundWalletWithStrip(data.transactionId, data.paymentIntentId, ctx.req.user?.userId as string);
	}
	
	@Authorized('vendor', 'customer', 'HiTable')
	@Query(() => TransactionsType)
	getUserTransactions(@Arg("data") data:getTransactionListInput, @Ctx() ctx: MyContext) {
		return this.getTransactions(data, ctx.req.user?.userId as string);
	}
	
}
