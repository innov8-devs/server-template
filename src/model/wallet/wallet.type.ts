import { ObjectId } from 'mongoose';

export interface IWallet {
	balance: number
	walletCurrencyCode: string;
	walletCurrencySymbol: string;
	walletCurrencyName: string;
	userId: ObjectId
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface IWalletTypeDocument extends IWallet, Document {}
