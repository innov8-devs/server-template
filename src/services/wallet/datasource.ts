import Base from '../../base';
import MasterDatasource from '../masters/datasource';
import { ValidationError } from 'apollo-server-express';
import __Wallet from '../../model/wallet/wallet.model';
import __Transactions from '../../model/transactions/transactions.model';
import { walletToWalletTransferInput } from './input.type';
import __Pin from '../../model/security/pin.model';
import Crypto from 'crypto';

class walletDatasource extends Base {
	
	async createWallet({userId, walletCurrencyCode}: { userId: string, walletCurrencyCode: string }) {
		const masterWalletSettings = await new MasterDatasource().getAvailableWalletServicesForUsersByCurrencyCode(walletCurrencyCode);
		if(!masterWalletSettings) throw new ValidationError('Unable to validate currency')
		const userWallet = await __Wallet.findOne({ userId: userId, walletCurrencyCode });
		if (userWallet) throw new ValidationError('Wallet already exists');
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
	
	async walletToWalletTransfer({ recipient, amount, pinNumber,walletCurrencyCode }: walletToWalletTransferInput, sender: string) {
		const pinValid = await __Pin.findOne({ userId: sender, pin: pinNumber });
		if (!pinValid) throw new ValidationError('Invalid pin');
		const fromUserWallet = await __Wallet.findOne({ userId: sender, walletCurrencyCode });
		if (!fromUserWallet) throw new ValidationError(`Senders Wallet for ${walletCurrencyCode} does not exist`);
		const toUserWallet = await __Wallet.findOne({ userId: recipient, walletCurrencyCode });
		if (!toUserWallet) throw new ValidationError(`Recipient's Wallet for ${walletCurrencyCode} does not exist`);
		if (fromUserWallet.balance < amount) throw new ValidationError('Insufficient funds');
		const transactionGroupId = Crypto.randomBytes(16).toString('hex').toString();
		
		await this.createTransactionInitBase({
			userId: sender,
			amount,
			transactionGroupId,
			transactionType: 'debit',
			transactionStatus: 'success',
			transactionCurrencyCode: walletCurrencyCode,
			narration: 'Wallet to wallet transfer',
			service: 'wallet',
		});

		await this.createTransactionInitBase({
			userId: recipient,
			amount,
			transactionGroupId,
			transactionType: 'deposit',
			transactionStatus: 'success',
			transactionCurrencyCode: walletCurrencyCode,
			narration: 'Wallet to wallet transfer',
		})
		
		await __Transactions.updateMany({ transactionGroupId }, { $set: { transactionStatus: 'success' } });
		
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
