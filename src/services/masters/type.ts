import { Field, ObjectType, ID} from 'type-graphql';


@ObjectType({ description: 'Allowed wallet Services' })
export class AllowedWalletServices {
	@Field({ description: 'Wallet Service Name' })
	service: string;
	
	@Field({ description: 'wallet service status' })
	enabled: boolean;
}


@ObjectType({ description: 'Wallet Configurations' })
export class ActiveWalletServices {
	@Field(()=> ID, { description: 'WalletType Id' })
	_id: string;
	
	@Field({ description: 'wallet Currency' })
	walletCurrency: string
	
	@Field({ description: 'Wallet wallet Currency Code' })
	walletCurrencyCode
	
	@Field({ description: 'Wallet wallet Currency Symbol' })
	walletCurrencySymbol: string
	
	@Field({ description: 'wallet currency name' })
	walletCurrencyName: string

	@Field(() => [AllowedWalletServices], { description: 'Services Allowed in the wallet' })
	allowedServices: AllowedWalletServices[];
}

