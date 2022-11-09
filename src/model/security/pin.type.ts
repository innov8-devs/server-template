import { ObjectId } from 'mongoose';

export interface IPin {
	pin: string | number;
	userId: ObjectId;
}

export interface IPinDocument extends IPin, Document {}
