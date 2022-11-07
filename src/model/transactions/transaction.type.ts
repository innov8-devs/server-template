import { ObjectId } from 'mongoose';

type transactionStatus = "pending" | "failed" | "completed" | "canceled";
type transactionType = "deposit" | "withdrawal" | "transfer"

export interface ITransaction {
	userId: ObjectId;
	transactionId: string;
	transactionType: transactionType;
	transactionStatus: transactionStatus;
	openingBalance: number;
	transactionAmount: number;
	transactionCurrency: string;
	transactionCurrencyCode: string;
	transactionCurrencySymbol: string;
	transactionCurrencyName: string;
	transactionCountryId: ObjectId;
	closingBalance: number;
	narration: string;
	transactionCountryName: string;
}

export interface ITransactionDocument extends ITransaction, Document {}
