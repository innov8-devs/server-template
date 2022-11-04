import Base from '../../base';
import UtilsDatasource from '../utils/datasource';
import AuthDatasource from '../auth/datasource';
import { createWalletTypeInput } from './input.type';
import { ValidationError } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { ObjectID } from 'typeorm';
import __MastersWalletSettings from '../../model/mastersWalletSetting/mastersWalletSetting.model';

class MasterDatasource extends Base {
	async createNewWalletCurrency({ walletCountryId, addonWalletCountryId, allowedServices }: createWalletTypeInput) {
		const country = await new UtilsDatasource().getACountry(addonWalletCountryId.toString());
		if (!country) throw new ValidationError('Unable to validate country');
		if(!country.isActive) throw new ValidationError('Country is not active');
		const walletType = await __MastersWalletSettings.findOne({
			walletCountryId,
			addonWalletCountryId
		});
		
		if (walletType) throw new ValidationError('Wallet currency settings already exists');
		await __MastersWalletSettings.create({
			walletCurrency: country.currency,
			walletCountryId,
			addonWalletCountryId,
			allowedServices: this.walletSettingsMapper(allowedServices),
			walletCurrencyCode: country.currencyCode,
			walletCurrencyName: country.currency,
			walletCurrencySymbol: country.currencySymbol,
		})
		return 'Wallet service created';
	}
	
	async getAvailableWalletServicesForUsers() {
		const user = await new AuthDatasource().getCurrentUser();
		console.log(user);
		if(!user.country) throw new ValidationError('Update your profile to continue');
		
		const walletSettings = await __MastersWalletSettings.findOne({
			walletCountryId: user.country
		});
		
		console.log(walletSettings);
		
		if(!walletSettings) throw new ValidationError('unable to validate Wallet services contact customer support');
		
		return walletSettings;
	}
	
}


export default MasterDatasource;
