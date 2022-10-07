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
import {DataSource, DataSourceConfig} from "apollo-datasource";
import moment from "moment";
import HtmlToPdf from "html-pdf";


interface IRecipient {
	name: string,
	address: string,
}

enum templateName {
	welcome = "welcome",
	activation = "activation",
	invoice = "invoice",
	resetPassword = "resetPassword",
	updatePassword = "updatePassword",
}

export interface Is3Params {
	Bucket?: string, // pass your bucket name
	Key: string, // file will be saved as testBucket/contacts.csv
	Body: ArrayBuffer,
	ContentType?: string
}

class Base extends DataSource {
	context: any;
	protected authAccount: any;
	templateName = templateName;

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
			welcome: templateName === "welcome" && fs.readFileSync(path.join(process.cwd(), 'src', 'utils', 'emailTemplate', 'welcome.ejs')).toString(),
			activation: templateName === "activation" && fs.readFileSync(path.join(process.cwd(), 'src', 'utils', 'emailTemplate', 'activation.ejs')).toString(),
			invoice: templateName === "invoice" && fs.readFileSync(path.join(process.cwd(), 'src', 'utils', 'emailTemplate', 'invoice.ejs')).toString(),
			resetPassword: templateName === "resetPassword" && fs.readFileSync(path.join(process.cwd(), 'src', 'utils', 'emailTemplate', 'resetPassword.ejs')).toString(),
			updatePassword: templateName === "updatePassword" && fs.readFileSync(path.join(process.cwd(), 'src', 'utils', 'emailTemplate', 'updatePassword.ejs')).toString()
		}
		const template = ejs.compile((selection[templateName]), {})
		return template(data)
	}

	compileTAndC(data: { firstName: string, lastName: string, otherName: string }, signature: string = 'signature', html?: string) {
		return ejs.compile(html)({
			fullName: `${data.firstName} ${data.lastName} ${data.otherName}`,
			signature: signature,
			date: moment().format('DD/MM/YYYY')
		})
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

	getNextPaymentAmount(amount: number, percentage: number, minProjectAmount: number) {
		const percentageAmount = this.getInstantPaymentAmount(amount, percentage)
		if (amount >= minProjectAmount) {
			return percentageAmount
		}
		return 0
	}

	getNextPaymentDate(date: Date = new Date(), days: number, amount: number, minProjectAmount: number) {
		if (amount >= minProjectAmount) {
			return moment(date).add(days, 'days').toDate()
		}
		return undefined
	}

	initialize(config: DataSourceConfig<any>): void | Promise<void> {
		this.context = config.context
		this.authAccount = config.context.req.user
	}

	htmlToPdf(html: string) {
		const options = {format: 'A4'};
		return new Promise((resolve, reject) => {
			HtmlToPdf.create(html, options).toBuffer((err, buffer) => {
				if (err) {
					reject(err)
				}
				resolve(buffer)
			})
		})
	}

	mailMessageForProfileUpdate(data: { email: string, password: string }) {
		return `
		  <b style="font-size: 10px">Note: These Credentials will be used for both the mobile App and email account</b>
				<b style="font-size: 10px">Account Credentials </b>
				 <ul>
					 <li>Email: ${data.email}</li>
					 <li>password: ${data.password}</li>
				</ul>
			<b>SMTP Config</b>
				<ul>
					 <li>
					 host: ${MAIL_HOST}
					 </li>
				 <li>port: ${MAIL_PORT}</li>
				</ul>
			<b>IMAP Config</b>
				<ul>
					 <li>host: ${MAIL_HOST}</li>
					 <li>port: 993</li>
				</ul>
		`
	}
}

export default Base
