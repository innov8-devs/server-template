import * as fs from 'fs';
import nodemailer from 'nodemailer';
import { MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_USER, STRIPE_SECRET_KEY, } from './tools/config';
import * as path from 'path';
import ejs from 'ejs';
import { AllowedWalletServices } from './services/masters/type';
import { allowedWalletServices } from './model/mastersWalletSetting/mastersWalletSetting.type';
import BaseWallet from './services/wallet/BaseWallet';
import Stripe from 'stripe';
import AuthDatasource from './services/auth/datasource';
import Crypto from 'crypto';
import MasterDatasource from './services/masters/datasource';
import __Transactions from './model/transactions/transactions.model';

const stripeClient = new Stripe(STRIPE_SECRET_KEY as string, {
	apiVersion: '2022-08-01',
});

interface StripPaymentWithStrip {
	amount: number;
	currency: string;
	description: string;
	metadata: any;
}

interface IRecipient {
	name: string,
	address: string,
}

enum templateName {
	resetPassword = 'resetPassword',
}

class Base extends BaseWallet {
	sendMailConfig() {
		const mailConfig = {
			host: MAIL_HOST,
			port: MAIL_PORT,
			auth: {
				user: MAIL_USER,
				pass: MAIL_PASS
			}
		};
		return nodemailer.createTransport(mailConfig as object);
	}
	
	getTemplate(templateName: templateName, data: object) {
		const selection = {
			resetPassword: templateName === 'resetPassword' && fs.readFileSync(path.join(process.cwd(), 'src', 'utils', 'emailTemplate', 'resetPassword.ejs')).toString(),
		};
		const template = ejs.compile((selection[templateName]), {});
		return template(data);
	}
	
	walletSettingsMapper(allowedServices: Array<allowedWalletServices>): Array<AllowedWalletServices> {
		const serviceList = ['transfer', 'withdraw', 'swapFunds', 'deposit', 'accountNumber', 'pay'] as allowedWalletServices[];
		return serviceList.map((value) => {
			const allowed = allowedServices.find((service) => value === service);
			return {
				service: value,
				enabled: !!allowed
			};
		});
	}
	
	
	sendOutMail(to: string | Array<IRecipient>, subject: string, TemplateName: templateName, data?: any, from?: string, attachments: Array<any> = []) {
		const info = {
			from: from || '"Deep Tech" <no-reply@verydeeptech.com>',
			to,
			attachments,
			subject: subject,
			html: this.getTemplate(TemplateName, data)
		};
		
		this.sendMailConfig().sendMail(<string>info.to, info.subject, info.html).then(info => {
			console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
		}).catch((e) => {
			console.error(e, `Error ending email to ${to}`);
		});
	}
	
	async stripPayInit({
											 amount,
											 currency,
											 description,
										 }: StripPaymentWithStrip) {
		return await stripeClient.paymentIntents.create({
			amount,
			currency,
			description
		});
	}
	async stripPayConfirm(paymentIntentId: string) {
		return await stripeClient.paymentIntents.confirm(paymentIntentId);
	}
}

export default Base;
