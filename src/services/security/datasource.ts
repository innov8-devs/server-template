import Base from '../../base';
import {Pin} from '../../Entities/pin';
import { ObjectID } from 'typeorm';
import { ObjectId } from 'mongodb';

class SecurityDatasource extends Base {
	async createTransactionPin(pin: number, userId: string) {
		const oldPin = await Pin.findOneBy({ userId: new ObjectId(userId) as unknown as ObjectID });
		if (!oldPin) {
			const newPin = new Pin();
			newPin.pin = pin;
			newPin.userId = userId as unknown as ObjectID;
			await Pin.save(newPin);
			return 'Pin created';
		}
		oldPin.pin = pin;
		await Pin.save(oldPin);
		return 'Pin updated';
	}

}


export default SecurityDatasource;
