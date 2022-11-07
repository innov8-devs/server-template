import { model, Schema } from 'mongoose';
import { IWallet, IWalletTypeDocument } from './wallet.type';


const wallet = new Schema<IWalletTypeDocument>({
	balance: { type: Number, default: 0 },
	walletCurrencyCode: { type: String, required: true, uniques: true },
	walletCurrencySymbol: { type: String, required: true },
	walletCurrencyName: { type: String, required: true },
	userId: { type: Schema.Types.ObjectId, required: true, index: true },
	isActive: { type: Boolean, default: true },
}, {
	timestamps: true,
})

export default model<IWallet>('Wallet', wallet);
