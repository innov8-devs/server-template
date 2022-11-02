import Base from '../../base';
import { wallet } from '../../Entities/wallet';
import { Pin } from '../../Entities/pin';
import { ObjectID } from 'typeorm';
import { ObjectId } from 'mongodb';
import { walletToWalletTransferInput } from './type';

class transactionsDatasource extends Base {
	async createWallet(userId: string) {
		const userWallet = await wallet.findOneBy({ userId: new ObjectId(userId) as unknown as ObjectID });
		if (userWallet) return Promise.reject('Wallet already exists');
		const newWallet = new wallet();
		newWallet.userId = userId as unknown as ObjectID;
		await wallet.save(newWallet);
		return 'Wallet created';
	}

	async getWalletBalance(userId: string) {
		const userWallet = await wallet.findOneBy({ userId: new ObjectId(userId) as unknown as ObjectID });
		if (!userWallet) return Promise.reject('Wallet does not exist');
		return userWallet.balance;
	}

	async walletToWalletTransfer({ recipient,amount, pinNumber }:walletToWalletTransferInput, sender: string) {
		const pinValid = await Pin.findOneBy({ userId: new ObjectId(sender) as unknown as ObjectID, pin:pinNumber });
		if (!pinValid) return Promise.reject('Invalid pin');
		const fromUserWallet = await wallet.findOneBy({ userId: new ObjectId(sender) as unknown as ObjectID });
		const toUserWallet = await wallet.findOneBy({ userId: new ObjectId(recipient) as unknown as ObjectID });
		if (!fromUserWallet || !toUserWallet) return Promise.reject('Wallet does not exist');
		if (fromUserWallet.balance < amount) return Promise.reject('Insufficient funds');
		fromUserWallet.balance -= amount;
		toUserWallet.balance += amount;
		await wallet.save(fromUserWallet);
		await wallet.save(toUserWallet);
		return 'Transfer successful';
	}

	async fundWalletWithStripePaymentLink(userId: string, amount: number, pin: number) {
		const userWallet = await wallet.findOneBy({ userId: new ObjectId(userId) as unknown as ObjectID });
		if (!userWallet) return Promise.reject('Wallet does not exist');
		// Stripe payment link logic here

		// End of stripe payment link logic
		return 'Payment link generated';

	}

	async walletToBankTransfer(userId: string, amount: number, pin: number) {
		const userWallet = await wallet.findOneBy({ userId: new ObjectId(userId) as unknown as ObjectID });
		if (!userWallet) return Promise.reject('Wallet does not exist');
		if (userWallet.balance < amount) return Promise.reject('Insufficient funds');
		userWallet.balance -= amount;
		// Bank transfer logic here

		// End of bank transfer logic
		await wallet.save(userWallet);
		return 'Transfer successful';
	}



}


export default transactionsDatasource;
