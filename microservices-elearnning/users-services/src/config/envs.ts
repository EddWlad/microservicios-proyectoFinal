import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  DB_NAME: get('DB_NAME').required().asString(),
  DB_USER: get('DB_USER').required().asString(),
  DB_PASSWORD: get('DB_PASSWORD').required().asString(),
  DB_HOST: get('DB_HOST').required().asString(),
  DB_PORT: get('DB_PORT').required().asPortNumber(),
  SYNCHRONIZE: get('SYNCHRONIZE').required().asBool(),
  LOGGING: get('LOGGING').required().asBool(),
  JWT_SEED: get('JWT_SEED').required().asString(),
  MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
  MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
  WEBSERVICES_URL: get('WEBSERVICES_URL').required().asString(),
  SEND_EMAIL: get('SEND_EMAIL').required().asBool(),
  TYPES: get('TYPES').required().asArray(),
}



