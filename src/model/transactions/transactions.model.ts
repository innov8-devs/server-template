import { model, Schema } from 'mongoose';
import { ITransactionDocument, ITransaction } from './transaction.type';

const transactions = new Schema<ITransactionDocument>({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		index: true
	},
	transactionId: {
		type: String,
		required: true,
		unique: true
	},
	transactionType: {
		type: String,
		required: true,
		index: true,
		enum: ['deposit', 'withdrawal', 'transfer', 'payment'],
	},
	transactionStatus: {
		type: String,
		enum: ['pending', 'failed', 'completed', 'canceled'],
		default: 'pending',
		required: true,
		index: true
	},
	openingBalance: {
		type: Number,
		required: true
	},
	transactionAmount: {
		type: Number, required: true
	},
	transactionCurrencyCode: {
		type: String,
		required: true,
		index: true
	},
	transactionCurrencySymbol: {
		type: String,
		required: true
	},
	transactionCurrencyName: {
		type: String,
		required: true,
		index: true
	},
	transactionCountryId: {
		type: Schema.Types.ObjectId,
		required: true,
		index: true
	},
	closingBalance: {
		type: Number,
		required: true
	},
	narration: {
		type: String,
		required: true
	},
	transactionCountryName: {
		type: String,
		required: true
	},
	
}, {
	timestamps: true
});
export default model<ITransactionDocument>('Transactions', transactions);
export { ITransaction, ITransactionDocument };
