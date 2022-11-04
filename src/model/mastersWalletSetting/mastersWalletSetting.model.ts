import { Schema, model } from 'mongoose';
import { IAllowedWalletServices, IMasterWalletDocument } from './mastersWalletSetting.type';


const allowedWalletServices = new Schema<IAllowedWalletServices>({
	service: { type: String, required: true},
	enabled: { type: Boolean, default: true },
}, {
	timestamps: true,
})

const masters_wallet_setting = new Schema<IMasterWalletDocument>({
	walletCurrency: { type: String, required: true, index: true },
	walletCurrencyCode: { type: String, required: true },
	walletCurrencySymbol: { type: String, required: true},
	walletCurrencyName: { type: String, required: true, index: true },
	walletCountryId: { type: Schema.Types.ObjectId, required: true, index: true },
	addonWalletCountryId: { type: Schema.Types.ObjectId, required: true, index: true },
	allowedServices: [allowedWalletServices],
	disabled: { type: Boolean, default: false },
}, {
	timestamps: true,
});

export default model<IMasterWalletDocument>('masters_wallet_settings', masters_wallet_setting);
