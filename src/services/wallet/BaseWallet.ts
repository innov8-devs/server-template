import __Wallet from '../../model/wallet/wallet.model';
import { ObjectId } from 'mongoose';
import { IWallet } from '../../model/wallet/wallet.type';
import AuthDatasource from '../auth/datasource';
import Crypto from 'crypto';
import MasterDatasource from '../masters/datasource';
import __Transactions from '../../model/transactions/transactions.model';
import { IMastersWalletSetting } from '../../model/mastersWalletSetting/mastersWalletSetting.type';
import { ValidationError } from 'apollo-server-express';
import __MastersWalletSettings from '../../model/mastersWalletSetting/mastersWalletSetting.model';

class walletDaBaseWallet  {
	async getWalletBase({userId, walletCurrencyCode}: { userId: string | ObjectId, walletCurrencyCode: string }): Promise<IWallet> {
		const userWallet = await __Wallet.findOne({ userId: userId, walletCurrencyCode });
		if (!userWallet) return Promise.reject('Wallet does not exist');
		return userWallet;
	}
	
	
	async createTransactionInitBase(transactionData: any) {
		const user = await new AuthDatasource().getCurrentUser();
		const {
			transactionAmount,
			narration,
			transactionCurrencyCode,
			stripData,
			transactionType,
		} = transactionData;
		
		const wallet = await this.getWalletBase({ userId: user._id, walletCurrencyCode: transactionCurrencyCode });
		
		const transactionCode = Crypto.randomBytes(16).toString('hex').toString();
		
		
		const masterWalletSettings = await this.getAvailableWalletServicesForUsersByCurrencyCode(transactionCurrencyCode);
		
		if (!masterWalletSettings) return Promise.reject('Unable to validate currency');
		
		const closingBalance = transactionType === 'deposit' ? wallet.balance + transactionAmount : wallet.balance - transactionAmount;
		
		const transaction = await __Transactions.create({
			userId: user._id,
			transactionId: transactionCode,
			transactionType: transactionType,
			openingBalance: wallet.balance,
			transactionAmount,
			stripData,
			transactionStatus: 'pending',
			transactionCurrency: wallet.walletCurrencyName,
			transactionCurrencyCode: wallet.walletCurrencyCode,
			transactionCurrencySymbol: wallet.walletCurrencySymbol,
			closingBalance: closingBalance,
			narration: narration
		});
		
		return {
			_id: transaction._id,
			txtRef: transactionCode,
		};
	}
	
	async getAvailableWalletServicesForUsersByCurrencyCode(code: string):Promise<IMastersWalletSetting> {
		const user = await new AuthDatasource().getCurrentUser();
		if(!user.country) throw new ValidationError('Update your profile to continue');
		
		const walletSettings = await __MastersWalletSettings.findOne({
			walletCountryId: user.country,
			walletCurrencyCode: code
		});
		
		if(!walletSettings) throw new ValidationError('unable to validate Wallet services contact customer support');
		
		return walletSettings;
	}
}


export default walletDaBaseWallet;
