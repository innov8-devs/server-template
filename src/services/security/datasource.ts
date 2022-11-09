import Base from '../../base';
import Pin from '../../model/security/pin.model';

class SecurityDatasource extends Base {
	async createTransactionPin(pin: string, userId: string) {
		const oldPin = await Pin.findOne({ userId });
		if (!oldPin) {
			await Pin.create({
				pin,
				userId
			});
			return 'Pin created';
		}
		oldPin.pin = pin;
		await oldPin.save();
		return 'Pin updated';
	}

}


export default SecurityDatasource;
