import Base from '../../base';
import Pin from '../../Entities/pin';

class SecurityDatasource extends Base {
	async createTransactionPin(pin: number, userId: string) {
		const oldPin = await Pin.findOne({ where: { userId } });
		if (!oldPin) {
			const newPin = new Pin();
			newPin.pin = pin;
			newPin.userId = userId;
			await Pin.save(newPin);
			return 'Pin created';
		}
		oldPin.pin = pin;
		await Pin.save(oldPin);
		return 'Pin updated';
	}

}


export default SecurityDatasource;
