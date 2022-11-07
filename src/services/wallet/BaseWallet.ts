import __Wallet from '../../model/wallet/wallet.model';
import { ObjectId } from 'mongoose';
import { IWallet } from '../../model/wallet/wallet.type';

class walletDaBaseWallet  {
	async getWalletBase({userId, walletCurrencyCode}: { userId: string | ObjectId, walletCurrencyCode: string }): Promise<IWallet> {
		const userWallet = await __Wallet.findOne({ userId: userId, walletCurrencyCode });
		if (!userWallet) return Promise.reject('Wallet does not exist');
		return userWallet;
	}
}


export default walletDaBaseWallet;
