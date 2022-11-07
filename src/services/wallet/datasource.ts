import Base from '../../base';
import { ObjectID } from 'typeorm';
import { ObjectId } from 'mongodb';
import MasterDatasource from '../masters/datasource';
import { ValidationError } from 'apollo-server-express';
import __Wallet from '../../model/wallet/wallet.model';

class walletDatasource extends Base {
	async createWallet({userId, walletCurrencyCode}: { userId: string, walletCurrencyCode: string }) {
		const masterWalletSettings = await new MasterDatasource().getAvailableWalletServicesForUsersByCurrencyCode(walletCurrencyCode);
		if(!masterWalletSettings) throw new ValidationError('Unable to validate currency')
		const userWallet = await __Wallet.findOne({ userId: userId, walletCurrencyCode });
		if (userWallet) return Promise.reject('Wallet already exists');
		await __Wallet.create({
			userId,
			walletCurrencyCode,
			balance: 0,
		});
		return 'Wallet created';
	}
	async getWalletBalance({userId, walletCurrencyCode}: { userId: string, walletCurrencyCode: string }) {
		const userWallet = await __Wallet.findOne({ userId: userId, walletCurrencyCode });
		if (!userWallet) return Promise.reject('Wallet does not exist');
		return userWallet.balance;
	}
}


export default walletDatasource;
