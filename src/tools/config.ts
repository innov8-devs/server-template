export const {
  MONGO_URL,
  NODE_ENV,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_PASS,
  MAIL_USER,
  BASE_AUTH_URL,
  APP_NAME,
  REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  BUCKET,
  JWT_SECRET,
  OBS,
  DOMAIN,
  STRIPE_SECRET_KEY,
  PLAY_GROUND,
} = process.env;

export const isDev = NODE_ENV === 'development';

const envs = {
  MAIL_HOST,
  MAIL_PASS,
  MAIL_PORT,
  DOMAIN,
  MAIL_USER,
  STRIPE_SECRET_KEY,
  MONGO_URL,
  BASE_AUTH_URL,
  BUCKET,
  OBS,
  APP_NAME,
  JWT_SECRET,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  REGION,
  PLAY_GROUND,
};

const list = Object.keys(envs);
const errors = {};
for (const listItem of list) {
  if (!envs[listItem]) {
    errors[listItem] = `${listItem} is not defined`;
  }
}

if (Object.keys(errors).length > 0) {
  const message = `ENV Error, the following ENV are not set:`;
  console.error(message);
  console.table(errors);
  throw new Error('Fix Env and rebuild');
}
