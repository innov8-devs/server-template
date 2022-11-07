import { Document, ObjectId } from 'mongoose';


// export type allowedWalletServices = 'transfer' | 'withdraw' | 'swapFunds' | 'deposit' | 'accountNumber' | 'pay';

export enum allowedWalletServices {
	transfer = 'transfer',
	withdraw = 'withdraw',
	swapFunds = 'swapFunds',
	deposit = 'deposit',
	accountNumber = 'accountNumber',
	pay = 'pay'
}

export interface IAllowedWalletServices {
	service: allowedWalletServices;
	enabled: boolean;
}

export interface IMastersWalletSetting {
	walletCurrency: string;
	userId: ObjectId;
	walletCurrencyCode: string;
	balance: number;
	walletCurrencySymbol: string;
	walletCurrencyName: string;
	walletCountryId: ObjectId;
	addonWalletCountryId: ObjectId;
	allowedServices: Array<allowedWalletServices>;
	disabled: boolean;
	isActive: boolean;
}


export interface IMasterWalletDocument extends IMastersWalletSetting, Document {
}
