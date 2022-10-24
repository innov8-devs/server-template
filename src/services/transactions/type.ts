import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';


@InputType({ description: 'Wallet to Wallet transfer parameters' })
export class walletToWalletTransferInput {
	@Length(1)
	@Field({ description: 'Transfer amount' })
	amount: number;

	@Field({ description: 'recipient user id' })
	recipient: string;

	@Field({ description: 'Transaction pin of sender' })
	pinNumber: number;
}


