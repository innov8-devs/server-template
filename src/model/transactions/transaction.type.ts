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
	closingBalance: number;
	narration: string;
	transactionCountryName: string;
	apiRes: any;
	stripData: any;
	stripTransactionId: string;
}

// export interface ITransactionInputPayLoad {
// 	transactionAmount
// 	narration
// 	transactionCurrencyCode
// 	transactionType
// }

export interface ITransactionDocument extends ITransaction, Document {}
