import { model, Schema } from 'mongoose';
import { IPinDocument } from './pin.type';


const PinModel = new Schema<IPinDocument>({
	pin: { type: Number, required: true },
	userId: { type: Schema.Types.ObjectId, required: true, index: true },
}, {
	timestamps: true,
});

export default model<IPinDocument>('Pin', PinModel);
