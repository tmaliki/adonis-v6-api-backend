/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
*/
import { Env } from '@adonisjs/core/env'

export default await Env.create(new URL('../', import.meta.url), {
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  PORT: Env.schema.number(),
  HOST: Env.schema.string({ format: 'host' }),
  APP_NAME: Env.schema.string(),
  APP_URL: Env.schema.string({ format: 'url' }),
  APP_KEY: Env.schema.string(),
  LOG_LEVEL: Env.schema.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),

  /*
  |----------------------------------------------------------
  | Variables for configuring database connection
  |----------------------------------------------------------
  */
  DB_CONNECTION: Env.schema.enum(['mysql', 'sqlite', 'postgres'] as const),
  DB_HOST: Env.schema.string({ format: 'host' }),
  DB_PORT: Env.schema.number(),
  DB_USER: Env.schema.string(),
  DB_PASSWORD: Env.schema.string.optional(),
  DB_DATABASE: Env.schema.string(),
  DB_CHARSET: Env.schema.string(),

  /*
  |----------------------------------------------------------
  | Variables for configuring mail connection
  |----------------------------------------------------------
  */
  MAIL_DRIVER: Env.schema.enum(['smtp', 'mailgun', 'ses'] as const),
  MAIL_HOST: Env.schema.string({ format: 'host' }),
  MAIL_PORT: Env.schema.number(),
  MAIL_USERNAME: Env.schema.string(),
  MAIL_PASSWORD: Env.schema.string(),
  MAIL_ENCRYPTION: Env.schema.enum(['tls', 'ssl'] as const),
  MAIL_FROM: Env.schema.string({ format: 'email' }),
  MAIL_FROM_NAME: Env.schema.string.optional(),

  /*
  |----------------------------------------------------------
  | Variables for configuring SESSION, HASH & JWT
  |----------------------------------------------------------
  */
  SESSION_DRIVER: Env.schema.enum(['cookie', 'file', 'memory', 'redis'] as const),
  HASH_DRIVER: Env.schema.enum(['bcrypt', 'scrypt', 'argon2'] as const),
  JWT_SECRET: Env.schema.string(),

  /*
  |----------------------------------------------------------
  | Variables for configuring the drive package
  |----------------------------------------------------------
  */
  DRIVE_DISK: Env.schema.enum(['fs', 's3'] as const),
  AWS_ACCESS_KEY_ID: Env.schema.string.optional(),
  AWS_SECRET_ACCESS_KEY: Env.schema.string.optional(),
  AWS_REGION: Env.schema.string.optional(),
  S3_BUCKET: Env.schema.string.optional(),
})
