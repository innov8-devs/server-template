import Base from '../../base';
import MasterDatasource from '../masters/datasource';
import { ValidationError } from 'apollo-server-express';
import __Wallet from '../../model/wallet/wallet.model';
import { walletToWalletTransferInput } from './input.type';
import __Pin from '../../model/security/pin.model';

class walletDatasource extends Base {
	async createWallet({userId, walletCurrencyCode}: { userId: string, walletCurrencyCode: string }) {
		const masterWalletSettings = await new MasterDatasource().getAvailableWalletServicesForUsersByCurrencyCode(walletCurrencyCode);
		if(!masterWalletSettings) throw new ValidationError('Unable to validate currency')
		const userWallet = await __Wallet.findOne({ userId: userId, walletCurrencyCode });
		if (userWallet) return Promise.reject('Wallet already exists');
		await __Wallet.create({
			userId,
			walletCurrencyCode,
			walletCurrencySymbol:masterWalletSettings.walletCurrencySymbol,
			walletCurrencyName:masterWalletSettings.walletCurrencyName,
			balance: 0,
		});
		return 'Wallet created';
	}
	async getWalletBalance({userId, walletCurrencyCode}: { userId: string, walletCurrencyCode: string }) {
		const wallet = await this.getWalletBase({userId, walletCurrencyCode});
		return wallet.balance;
	}
	
	async getWalletDetails({userId, walletCurrencyCode}: { userId: string, walletCurrencyCode: string }) {
		return this.getWalletBase({userId, walletCurrencyCode});
	}
	async walletToWalletTransfer({ recipient, amount, pinNumber }: walletToWalletTransferInput, sender: string) {
		const pinValid = await __Pin.findOne({ userId: sender, pin: pinNumber });
		if (!pinValid) return Promise.reject('Invalid pin');
		const fromUserWallet = await __Wallet.findOne({ userId: sender });
		const toUserWallet = await __Wallet.findOne({ userId: recipient });
		if (!fromUserWallet || !toUserWallet) throw new ValidationError('Wallet does not exist');
		if (fromUserWallet.balance < amount) throw new ValidationError('Insufficient funds');
		fromUserWallet.balance -= amount;
		toUserWallet.balance += amount;
		await fromUserWallet.save();
		await toUserWallet.save();
		return 'Transfer successful';
	}
	async getAllWallet({userId}: { userId: string }) {
		return __Wallet.find({ userId });
	}
}


export default walletDatasource;
