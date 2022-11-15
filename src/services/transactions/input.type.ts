import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class initFundWalletWithStripType {
	@Field({ description: 'Strip Client Id' })
	stripClientSecret: string;
	
	@Field({ description: 'transaction reference' })
	transactionInit: string;
	
	@Field({ description: 'strip transaction intent id' })
	stripPaymentIntentId: string;
}

