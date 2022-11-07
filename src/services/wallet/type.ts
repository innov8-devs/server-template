import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class WalletType {
	@Field({ description: 'Wallet id' })
	_id: string;
	
	@Field({ description: 'Wallet balance' })
	balance: number;
	
	@Field({ description: 'Wallet currency code' })
	walletCurrencyCode: string;
	
	@Field({ description: 'Wallet currency symbol' })
	walletCurrencySymbol: string;
	
	@Field({ description: 'Wallet currency name' })
	walletCurrencyName: string;
	
	@Field({ description: 'Wallet status' })
	isActive: boolean;
	
	@Field({ description: 'Wallet creation date' })
	createdAt: Date;
	
	@Field({ description: 'Wallet last update date' })
	updatedAt: Date;
}
