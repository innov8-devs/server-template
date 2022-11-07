import { ObjectId } from 'mongoose';

export interface IPin {
	pin: number;
	userId: ObjectId;
}

export interface IPinDocument extends IPin, Document {}