import Base from '../../base';
import { wallet } from '../../Entities/wallet';
import { ObjectID } from 'typeorm';
import { ObjectId } from 'mongodb';

class walletDatasource extends Base {
	async createWallet(userId: string) {
		const userWallet = await wallet.findOneBy({ userId: new ObjectId(userId) as unknown as ObjectID });
		if (userWallet) return Promise.reject('Wallet already exists');
		const newWallet = new wallet();
		newWallet.userId = userId as unknown as ObjectID;
		await wallet.save(newWallet);
		return 'Wallet created';
	}

}


export default walletDatasource;
