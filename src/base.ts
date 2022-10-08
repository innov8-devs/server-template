import * as fs from 'fs'
import nodemailer from 'nodemailer'
import {
	MAIL_HOST,
	MAIL_PASS,
	MAIL_PORT,
	MAIL_USER,
} from './tools/config'
import * as path from 'path'
import ejs from 'ejs'


interface IRecipient {
	name: string,
	address: string,
}

enum templateName {
	resetPassword = "resetPassword",
}

export interface Is3Params {
	Bucket?: string, // pass your bucket name
	Key: string, // file will be saved as testBucket/contacts.csv
	Body: ArrayBuffer,
	ContentType?: string
}

class Base {
	sendMailConfig() {
		const mailConfig = {
			host: MAIL_HOST,
			port: MAIL_PORT,
			auth: {
				user: MAIL_USER,
				pass: MAIL_PASS
			}
		}
		return nodemailer.createTransport(mailConfig as object)
	}

	getTemplate(templateName: templateName, data: object) {
		const selection = {
			resetPassword: templateName === "resetPassword" && fs.readFileSync(path.join(process.cwd(), 'src', 'utils', 'emailTemplate', 'resetPassword.ejs')).toString(),
		}
		const template = ejs.compile((selection[templateName]), {})
		return template(data)
	}

	sendMail(to: string | Array<IRecipient>, subject: string, TemplateName: templateName, data?: any, from?: string, attachments: Array<any> = []) {
		const info = {
			from: from || '"Deep Tech" <no-reply@verydeeptech.com>',
			to,
			attachments,
			subject: subject,
			html: this.getTemplate(TemplateName, data)
		}

		this.sendMailConfig().sendMail(info).then(info => {
			console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info))
		}).catch((e) => {
			console.error(e, `Error ending email to ${to}`)
		})
	}

	getPercentageOfAmount(amount: number, percentage: number) {
		return amount * (percentage / 100)
	}

	getInstantPaymentAmount(amount: number, percentage: number) {
		return this.getPercentageOfAmount(amount, percentage)
	}

}

export default Base
