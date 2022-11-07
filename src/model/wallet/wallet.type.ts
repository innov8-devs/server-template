import { ObjectId } from 'mongoose';

interface WalletType {
	_id: ObjectId;
	balance: number;
	walletType: string;
	userId: ObjectId;
}

interface WalletTypeDocument extends WalletType, Document {}
