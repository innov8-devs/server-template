import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import TransactionsDatasource from './datasource';
import { initFundWalletWithStripInput } from './type';
import { initFundWalletWithStripType } from './input.type';


@Resolver()
export class TransactionsResolver extends TransactionsDatasource {
	@Authorized('vendor', 'customer', 'HiTable')
	@Mutation(() => initFundWalletWithStripType)
	userInitFundWalletWithStrip(@Arg('data') data:initFundWalletWithStripInput, @Ctx() ctx: MyContext) {
		const { amount, walletCurrencyCode } = data;
		return this.initFundWalletWithStripe({ amount, walletCurrencyCode }, ctx.req.user?.userId as string);
	}
	
}
