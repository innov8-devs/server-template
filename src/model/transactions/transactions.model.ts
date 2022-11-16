import { model, Schema, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
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
		enum: ['pending', 'failed', 'success', 'canceled'],
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
	transactionGroupId: {
		type: String,
		index: true
	},
	transactionCurrency: {
		type: String,
		required: true,
		index: true
	},
	stripTransactionId: {
		type: String,
	},
	closingBalance: {
		type: Number,
		required: true
	},
	narration: {
		type: String,
		required: true
	},
	stripData: {
		type: Object,
	},
	apiRes: {
		type:Schema.Types.Mixed,
	},
	
}, {
	timestamps: true
});

transactions.plugin(paginate);
export default model<ITransactionDocument, PaginateModel<ITransaction>>('Transactions', transactions);
export { ITransaction, ITransactionDocument };
