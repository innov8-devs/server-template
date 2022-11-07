import { model, Schema } from 'mongoose';
import { IMasterWalletDocument } from '../mastersWalletSetting/mastersWalletSetting.type';


const wallet = new Schema<IMasterWalletDocument>({
	balance: { type: Number, default: 0 },
	walletCurrencyCode: { type: String, required: true, uniques: true },
	walletCurrencySymbol: { type: String, required: true },
	walletCurrencyName: { type: String, required: true },
	userId: { type: Schema.Types.ObjectId, required: true, index: true },
	isActive: { type: Boolean, default: true },
}, {
	timestamps: true,
})

export default model<IMasterWalletDocument>('Wallet', wallet);
