import { ObjectId } from 'mongoose';

// type transactionStatus = "pending" | "failed" | "success" | "canceled";
// type transactionType = "deposit" | "withdrawal" | "transfer"

enum transactionStatus {
	pending = 'pending',
	failed = 'failed',
	success = 'success',
	canceled = 'canceled'
}

enum transactionType {
	deposit = 'deposit',
	withdrawal = 'withdrawal',
	transfer = 'transfer',
}

export interface ITransaction {
	userId: ObjectId;
	transactionId: string;
	transactionType: transactionType;
	transactionStatus: transactionStatus;
	transactionGroupId?: string;
	openingBalance: number;
	transactionAmount: number;
	transactionCurrency: string;
	transactionCurrencyCode: string;
	transactionCurrencySymbol: string;
	transactionCurrencyName: string;
	closingBalance: number;
	narration: string;
	transactionCountryName: string;
	apiRes: any;
	stripData: any;
	stripTransactionId: string;
}

export interface ITransactionDocument extends ITransaction, Document {
}
