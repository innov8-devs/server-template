import { Field, InputType, registerEnumType } from 'type-graphql';
import { ObjectId } from 'mongoose';
import { allowedWalletServices } from '../../model/mastersWalletSetting/mastersWalletSetting.type';


// @InputType({ description: 'Wallet to Wallet transfer parameters' })
// export class walletToWalletTransferInput {
// 	@Field({ description: 'Transfer amount' })
// 	amount: number;
//
// 	@Field({ description: 'recipient user id' })
// 	recipient: string;
//
// 	@Field({ description: 'Transaction pin of sender' })
// 	pinNumber: number;
// }


// enum transactionStatus {
// 	'pending' = 'pending',
// 	'failed' = 'failed',
// 	'completed' = 'completed',
// 	'canceled' = 'canceled'
// }



enum transactionType {
	deposit = 'deposit',
	withdrawal = 'withdrawal',
	transfer = 'transfer',
	payment = 'payment'
}

registerEnumType(transactionType, { name: 'transactionType' });

@InputType({ description: 'Create Transaction parameters' })
export class createTransactionInput {
	@Field(() => transactionType, { description: 'Transaction type' })
	transactionType: transactionType;
	
	@Field({ description: 'Transaction amount' })
	transactionAmount: number;
	
	@Field({ description: 'Transaction currency code' })
	transactionCurrencyCode: string;
	
	
	@Field({ description: 'Transaction narration' })
	narration: string;
	
	@Field(()=>allowedWalletServices, { description: 'Transaction country name' })
	service: allowedWalletServices;
}

@InputType({ description: 'init fund wallet with strip' })
export class initFundWalletWithStripInput {
	@Field({ description: 'Transaction amount' })
	amount: number;
	
	@Field({ description: 'Transaction wallet Currency Code' })
	walletCurrencyCode: string;
	
}
