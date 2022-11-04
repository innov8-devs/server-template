import { Field, InputType, registerEnumType } from 'type-graphql';
import { allowedWalletServices } from '../../model/mastersWalletSetting/mastersWalletSetting.type';




registerEnumType(allowedWalletServices, {
	name: 'allowedServices',
	description: 'Allowed services for wallet'
});


@InputType({ description: 'WalletType creation' })
export class createWalletTypeInput {
	@Field({ description: 'Wallet' })
	walletCountryId: string;
	
	@Field({ description: 'Addon wallet' })
	addonWalletCountryId: string;
	
	@Field(()=>[allowedWalletServices], { description: 'WalletType description' })
	allowedServices: [allowedWalletServices];
}
