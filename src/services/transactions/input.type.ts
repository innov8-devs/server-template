import { Field, InputType, ObjectType, registerEnumType } from 'type-graphql';
import { allowedWalletServices } from '../../model/mastersWalletSetting/mastersWalletSetting.type';


enum transactionType {
	deposit = 'deposit',
	withdrawal = 'withdrawal',
	transfer = 'transfer',
	payment = 'payment'
}

registerEnumType(transactionType, { name: 'transactionType' });


@ObjectType()
export class initFundWalletWithStripType {
	@Field({ description: 'Strip Client Id' })
	stripClientSecret: string;
	
	@Field({ description: 'transaction reference' })
	transactionInit: string;
	
	@Field({ description: 'strip transaction intent id' })
	stripPaymentIntentId: string;
}

@InputType({ description: 'init fund wallet with strip' })
export class initFundWalletWithStripInput {
	@Field({ description: 'Transaction amount' })
	amount: number;
	
	@Field({ description: 'Transaction wallet Currency Code' })
	walletCurrencyCode: string;
}


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

@InputType({ description: 'Confirm fund wallet with strip' })
export class confirmFundWalletWithStripInput {
	@Field({ description: 'Transaction reference' })
	transactionId: string;
	
	@Field({ description: 'Strip payment intent id' })
	paymentIntentId: string;
}


@InputType({ description: 'Get Transaction list' })
	export class getTransactionListInput {
	@Field({ description: 'Page number' })
	page: number;
	
	@Field({ description: 'Page size' })
	limit: number;
}

