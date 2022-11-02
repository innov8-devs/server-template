import Base from '../../base';
import { MastersWalletSetting } from '../../Entities/mastersWalletSetting';
import UtilsDatasource from '../utils/datasource';
import AuthDatasource from '../auth/datasource';
import { createWalletTypeInput } from './input.type';
import { ValidationError } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { ObjectID } from 'typeorm';

class MasterDatasource extends Base {
	async createNewWalletCurrency({ walletCountryId, addonWalletCountryId, allowedServices }: createWalletTypeInput) {
		const country = await new UtilsDatasource().getACountry(addonWalletCountryId.toString());
		if (!country) throw new ValidationError('Unable to validate country');
		if(!country.isActive) throw new ValidationError('Country is not active');
		
		const walletCountryIdObjectId = new ObjectId(walletCountryId) as unknown as ObjectID;
		const addonWalletCountryIdObjectId = new ObjectId(addonWalletCountryId) as unknown as ObjectID;
		
		const walletType = await MastersWalletSetting.findOneBy({
			walletCountryId: walletCountryIdObjectId,
			addonWalletCountryId: addonWalletCountryIdObjectId
		});
		
		if (walletType) throw new ValidationError('Wallet currency settings already exists');
		const newWalletCurrency = new MastersWalletSetting();
		
		newWalletCurrency.walletCountryId = walletCountryIdObjectId;
		newWalletCurrency.addonWalletCountryId = addonWalletCountryIdObjectId;
		newWalletCurrency.allowedServices = this.walletSettingsMapper(allowedServices);
		newWalletCurrency.walletCurrencySymbol = country.currencySymbol;
		newWalletCurrency.walletCurrencyCode = country.currencyCode;
		newWalletCurrency.walletCurrencyName = country.currency;
		
		await newWalletCurrency.save();
		return 'Wallet type created';
	}
	
	async getAvailableWalletServicesForUsers() {
		const user = await new AuthDatasource().getCurrentUser();
		if(!user.country) throw new ValidationError('Update your profile to continue');
		
		const walletSettings = await MastersWalletSetting.findOneBy({
			walletCountryId: user.country._id,
			addonWalletCountryId: user.country._id
		});
		
		if(!walletSettings) throw new ValidationError('Wallet settings not found');
		
		return walletSettings;
	}
	
	
	
	
	
}


export default MasterDatasource;
