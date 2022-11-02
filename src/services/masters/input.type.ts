import { Field, InputType, registerEnumType } from 'type-graphql';
import { allowedServices } from '../../Entities/mastersWalletSetting';


registerEnumType(allowedServices, {
	name: 'allowedServices',
	description: 'Allowed services for wallet'
});


@InputType({ description: 'WalletType creation' })
export class createWalletTypeInput {
	@Field({ description: 'Wallet' })
	walletCountryId: string;
	
	@Field({ description: 'Addon wallet' })
	addonWalletCountryId: string;
	
	@Field(()=>[allowedServices], { description: 'WalletType description' })
	allowedServices: [allowedServices];
}
