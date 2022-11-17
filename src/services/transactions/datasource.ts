import Base from '../../base';
import __Transactions from '../../model/transactions/transactions.model';
import __Wallet from '../../model/wallet/wallet.model';
import { ValidationError } from 'apollo-server-express';

class transactionsDatasource extends Base {
	
	async createTransactionInit(transactionData: any) {
		return this.createTransactionInitBase(transactionData);
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
	
	async confirmFundWalletWithStrip(transactionId: string, paymentIntentId: string, userId: string) {
		const transaction = await __Transactions.findOne({ transactionId, userId });
		if (!transaction) throw new ValidationError('Transaction does not exist');
		
		const userWallet = await __Wallet.findOne({
			userId: transaction.userId,
			walletCurrencyCode: transaction.transactionCurrencyCode
		});
		if (!userWallet) throw new ValidationError('Wallet does not exist');
		
		const stripConfirm = await this.stripPayConfirm(paymentIntentId);
		const closingBalance = userWallet.balance + transaction.transactionAmount;
		const openingBalance = userWallet.balance;
		if (stripConfirm.status === 'succeeded') {
			userWallet.balance = userWallet.balance + transaction.transactionAmount;
			await userWallet.save();
		}
		await __Transactions.updateOne({ _id: transaction._id }, {
			$set: {
				status: stripConfirm.status === 'succeeded' ? 'success' : 'failed',
				openingBalance,
				closingBalance
			}
		});
		if (stripConfirm.status === 'succeeded') return 'Wallet funded successfully';
		throw new ValidationError('Transaction failed');
	}
	
	async getTransactions({ page, limit }: { page: number, limit?: number }, userId: string) {
		const options = {
			page,
			limit: limit || 30,
			sort: { createdAt: -1 },
		};
		return __Transactions.paginate({ userId }, options);
	}
	
}


export default transactionsDatasource;
