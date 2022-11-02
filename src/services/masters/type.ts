import { Field, ObjectType } from 'type-graphql';


@ObjectType({ description: 'Allowed wallet Services' })
export class AllowedWalletServices {
	@Field({ description: 'Wallet Service Name' })
	service: string;
	
	@Field({ description: 'wallet service status' })
	enabled: boolean;
}


@ObjectType({ description: 'WalletType' })
export class ActiveWalletServices {
	@Field({ description: 'WalletType Id' })
	_id: string;

	@Field(() => [AllowedWalletServices], { description: 'Services Allowed in the wallet' })
	allowedServices: AllowedWalletServices[];
}

