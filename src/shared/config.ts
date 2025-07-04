import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'
import z from 'zod'

config({
  path: '.env',
})

// check .env file
if (!fs.existsSync(path.resolve('.env'))) {
  console.log('No .env file found')
  process.exit(1)
}

const configSchema = z.object({
  DATABASE_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
  SECRET_API_KEY: z.string(),

  ADMIN_EMAIL: z.string(),
  ADMIN_PASSWORD: z.string(),
  ADMIN_PHONE_NUMBER: z.string(),
  ADMIN_NAME: z.string(),
})

const configServer = configSchema.safeParse(process.env)
if (!configServer.success) {
  console.log('The values declared in the .env file are invalid')
  console.error(configServer.error)
  process.exit(1)
}

const envConfig = configServer.data

export default envConfig
