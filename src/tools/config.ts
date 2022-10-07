
export const {
	MONGO_URL,
	NODE_ENV,
	MAIL_HOST,
	MAIL_PORT,
	MAIL_PASS,
	MAIL_USER,
	REGION,
	AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY,
	BUCKET,
	OBS,
	DOMAIN
} = process.env
export const isDev = NODE_ENV === "development"
export const cookieOptions = {
	// maxAge: 3.154e+10,
	domain: isDev ? 'localhost' : `.${DOMAIN}`,
	httpOnly: true
}
const envs = {
	cookieOptions,
	MAIL_HOST,
	MAIL_PASS,
	MAIL_PORT,
	DOMAIN,
	MAIL_USER,
	MONGO_URL,
	REGION,
	AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY,
	BUCKET,
	OBS,
}
const list = Object.keys(envs)
const errors = {}
for (const listItem of list) {
	if (!envs[listItem]) {
		errors[listItem] = `${listItem} is not defined`
	}
}

if (Object.keys(errors).length > 0) {
	const message = `ENV Error, the following ENV are not set:`
	console.error(message);
	console.table(errors);
	throw new Error("Fix Env and rebuild")
}
