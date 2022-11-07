import Base from '../../base';
import __Transactions, { ITransaction } from '../../model/transactions/transactions.model';
import __Wallet from '../../model/wallet/wallet.model';
import * as Crypto from 'crypto';
import AuthDatasource from '../auth/datasource';
import { allowedWalletServices } from '../../model/mastersWalletSetting/mastersWalletSetting.type';
import MasterDatasource from '../masters/datasource';
import { walletToWalletTransferInput } from '../wallet/type';
import __Pin from '../../model/security/pin.model';

class transactionsDatasource extends Base {
	
	async initTransaction(transactionData: ITransaction & { service: allowedWalletServices }) {
		const user = await new AuthDatasource().getCurrentUser();
		const {
			transactionAmount,
			narration,
			transactionCurrencyCode,
			transactionCurrency,
			transactionType,
		} = transactionData;
		
		const wallet = await this.getWalletBase({ userId: user._id, walletCurrencyCode: transactionCurrencyCode });
		
		const transactionCode = Crypto.randomBytes(16).toString('hex').toString();
		
		
		const masterWalletSettings = await new MasterDatasource().getAvailableWalletServicesForUsersByCurrencyCode(transactionCurrencyCode);
		
		if (!masterWalletSettings) return Promise.reject('Unable to validate currency');
		
		const closingBalance = transactionType === 'deposit' ? wallet.balance + transactionAmount : wallet.balance - transactionAmount;
		
		await __Transactions.create({
			userId: user._id,
			transactionId: transactionCode,
			transactionType: transactionType,
			openingBalance: wallet.balance,
			transactionAmount,
			transactionCurrency,
			transactionCurrencyCode: wallet.walletCurrencyCode,
			transactionCurrencySymbol: wallet.walletCurrencySymbol,
			transactionCurrencyName: wallet.walletCurrencyName,
			transactionCountryId: user.country,
			closingBalance: closingBalance,
			narration: narration
		});
		return {
			txtRef: transactionCode,
		};
		// const newTransaction = new __Transactions();
		// newTransaction.userId = userId as unknown as ObjectID;
		// return newTransaction;
	}
	
	async walletToWalletTransfer({ recipient, amount, pinNumber }: walletToWalletTransferInput, sender: string) {
		const pinValid = await __Pin.findOne({ userId: sender, pin: pinNumber });
		if (!pinValid) return Promise.reject('Invalid pin');
		const fromUserWallet = await __Wallet.findOne({ userId: sender });
		const toUserWallet = await __Wallet.findOne({ userId: recipient });
		if (!fromUserWallet || !toUserWallet) return Promise.reject('Wallet does not exist');
		if (fromUserWallet.balance < amount) return Promise.reject('Insufficient funds');
		fromUserWallet.balance -= amount;
		toUserWallet.balance += amount;
		await fromUserWallet.save();
		await toUserWallet.save();
		return 'Transfer successful';
	}
	
	async fundWalletWithStripePaymentLink(userId: string, amount: number, pin: number) {
		const userWallet = await __Wallet.findOne({ userId });
		if (!userWallet) return Promise.reject('Wallet does not exist');
		// Stripe payment link logic here
		
		// End of stripe payment link logic
		return 'Payment link generated';
		
	}
	
	async __WalletToBankTransfer(userId: string, amount: number, pin: number) {
		const userWallet = await __Wallet.findOne({ userId });
		if (!userWallet) return Promise.reject('Wallet does not exist');
		if (userWallet.balance < amount) return Promise.reject('Insufficient funds');
		userWallet.balance -= amount;
		// Bank transfer logic here
		
		// End of bank transfer logic
		// await __Wallet.save(userWallet);
		return 'Transfer successful'; // return transaction reference
	}
	
	
}


export default transactionsDatasource;
