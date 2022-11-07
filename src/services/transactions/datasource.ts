import Base from '../../base';
import __Transactions, { ITransaction } from '../../model/transactions/transactions.model';
import { ObjectId } from 'mongoose';
import __Wallet from '../../model/wallet/wallet.model';
import MasterDatasource from '../masters/datasource';
import * as Crypto from 'crypto';
import AuthDatasource from '../auth/datasource';
import { allowedWalletServices } from '../../model/mastersWalletSetting/mastersWalletSetting.type';
import { ValidationError } from 'apollo-server-express';

class transactionsDatasource extends Base {
	
	async initTransaction(transactionData: ITransaction & {service: allowedWalletServices}) {
		const user = await new AuthDatasource().getCurrentUser();
		const {
			transactionAmount,
			narration,
			transactionType,
		} = transactionData;
		
		const transactionCode = Crypto.randomBytes(16).toString('hex').toString();
		// const masterWalletSettings = await new MasterDatasource().getAvailableWalletServicesForUsersByCurrencyCode();
		
		
		await __Transactions.create({
			userId: user._id,
			transactionId: transactionCode,
			transactionType: transactionType,
			openingBalance: 0,
			transactionAmount: transactionAmount,
			transactionCurrency: 'NGN',
			transactionCurrencyCode: 0,
			transactionCurrencySymbol: '$',
			transactionCurrencyName: 'Naira',
			transactionCountryId: user.country,
			closingBalance: 0,
			narration: narration
		});
		return {
			txtRef: transactionCode,
		};
		// const newTransaction = new __Transactions();
		// newTransaction.userId = userId as unknown as ObjectID;
		// return newTransaction;
	}
	
	// async __WalletToWalletTransfer({ recipient, amount, pinNumber }: __WalletToWalletTransferInput, sender: string) {
		// const pinValid = await Pin.findOneBy({ userId: new ObjectId(sender) as unknown as ObjectID, pin:pinNumber });
		// if (!pinValid) return Promise.reject('Invalid pin');
		// const fromUserWallet = await __Wallet.findOneBy({ userId: new ObjectId(sender) as unknown as ObjectID });
		// const toUserWallet = await __Wallet.findOneBy({ userId: new ObjectId(recipient) as unknown as ObjectID });
		// if (!fromUserWallet || !toUserWallet) return Promise.reject('Wallet does not exist');
		// if (fromUserWallet.balance < amount) return Promise.reject('Insufficient funds');
		// fromUserWallet.balance -= amount;
		// toUserWallet.balance += amount;
		// await __Wallet.save(fromUserWallet);
		// await __Wallet.save(toUserWallet);
		// return 'Transfer successful';
	// }
	
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
