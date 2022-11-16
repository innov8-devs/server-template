import Base from '../../base';
import __Transactions from '../../model/transactions/transactions.model';
import __Wallet from '../../model/wallet/wallet.model';
import * as Crypto from 'crypto';
import AuthDatasource from '../auth/datasource';
import MasterDatasource from '../masters/datasource';
import { ValidationError } from 'apollo-server-express';

class transactionsDatasource extends Base {
	
	async createTransactionInit(transactionData: any) {
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
		
		
		const masterWalletSettings = await new MasterDatasource().getAvailableWalletServicesForUsersByCurrencyCode(transactionCurrencyCode);
		
		if (!masterWalletSettings) return Promise.reject('Unable to validate currency');
		
		const closingBalance = transactionType === 'deposit' ? wallet.balance + transactionAmount : wallet.balance - transactionAmount;
		
		const transaction = await __Transactions.create({
			userId: user._id,
			transactionId: transactionCode,
			transactionType: transactionType,
			openingBalance: wallet.balance,
			transactionAmount,
			stripData,
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
	
	async initFundWalletWithStripe({
																	 amount,
																	 walletCurrencyCode
																 }: { walletCurrencyCode: string, amount: number }, userId: string) {
		const userWallet = await __Wallet.findOne({ userId, walletCurrencyCode });
		if (!userWallet) throw new ValidationError('Wallet does not exist');
		if (walletCurrencyCode === 'NGN') throw new ValidationError(`Cannot fund wallet ${walletCurrencyCode} with stripe`);
		const stripInit = await this.stripPayInit({
			amount,
			currency: userWallet.walletCurrencyCode,
			description: 'Wallet funding',
			metadata: {
				userId: userId,
				transactionType: 'deposit',
				walletCurrencyCode: userWallet.walletCurrencyCode
			}
		});
		const transactionInit = await this.createTransactionInit({
			transactionAmount: amount,
			transactionType: 'deposit',
			stripData: stripInit,
			narration: 'Deposit via stripe',
			transactionCurrencyCode: userWallet.walletCurrencyCode,
		});
		
		return {
			stripClientSecret: stripInit.client_secret,
			transactionInit: transactionInit.txtRef,
			stripPaymentIntentId: stripInit.id,
		};
	}
	
	async confirmFundWalletWithStrip(transactionId: string, paymentIntentId: string, userId:string) {
		const transaction = await __Transactions.findOne({ transactionId, userId });
		if (!transaction) throw new ValidationError('Transaction does not exist');
		const userWallet = await __Wallet.findOne({
			userId: transaction.userId,
			walletCurrencyCode: transaction.transactionCurrencyCode
		});
		if (!userWallet) throw new ValidationError('Wallet does not exist');
		const stripConfirm = await this.stripPayConfirm(paymentIntentId);
		if (stripConfirm.status === 'succeeded') {
			const closingBalance = userWallet.balance + transaction.transactionAmount;
			const openingBalance = userWallet.balance;
			userWallet.balance = userWallet.balance + transaction.transactionAmount;
			await userWallet.save();
			await __Transactions.updateOne({ _id: transaction._id }, {
				$set: {
					status: 'success',
					openingBalance,
					closingBalance
				}
			});
			return "success";
		}
	}
	
}


export default transactionsDatasource;
