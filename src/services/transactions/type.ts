import { ObjectType, Field, ID } from 'type-graphql';
import { PaginationType } from '../globalType';

@ObjectType()
class Transactions {
	@Field(()=> ID,{ description: 'Transaction Id' })
	transactionId: string;

	@Field(()=> ID, { description: 'Transaction type' })
	transactionType: string;

	@Field({ description: 'Transaction amount' })
	transactionAmount: number;

	@Field({ description: 'Transaction currency code' })
	transactionCurrencyCode: string;

	@Field({ description: 'Transaction narration' })
	narration: string;

	@Field({ description: 'Transaction status' })
	status: string;

	@Field({ description: 'Transaction created at' })
	createdAt: Date;

	@Field({ description: 'Transaction updated at' })
	updatedAt: Date;
}

@ObjectType()
export class TransactionsType extends PaginationType {
	@Field( ()=>[Transactions],{ description: 'Transaction list' })
	docs: Transactions[];
}
