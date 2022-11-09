import { Field, ID, InputType } from 'type-graphql';


@InputType({ description: 'Wallet to Wallet transfer parameters' })
export class walletToWalletTransferInput {
	@Field({ description: 'Transfer amount' })
	amount: number;
	
	@Field(() => ID, { description: 'recipient user id' })
	recipient: string;
	
	@Field({ description: 'Transaction wallet' })
	walletCurrencyCode: string;
	
	@Field({ description: 'Transaction pin of sender' })
	pinNumber: number;
}


