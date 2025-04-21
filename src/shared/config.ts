import { plainToInstance } from 'class-transformer'
import { IsString, validateSync } from 'class-validator'
import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'

config({
  path: '.env',
})

// check .env file
if (!fs.existsSync(path.resolve('.env'))) {
  console.log('No .env file found')
  process.exit(1)
}

class ConfigSchema {
  @IsString()
  DATABASE_URL: string

  @IsString()
  ACCESS_TOKEN_SECRET: string

  @IsString()
  ACCESS_TOKEN_EXPIRES_IN: string

  @IsString()
  REFRESH_TOKEN_SECRET: string

  @IsString()
  REFRESH_TOKEN_EXPIRES_IN: string
}

const configServer = plainToInstance(ConfigSchema, process.env)
const errors = validateSync(configServer)

if (errors.length > 0) {
  console.log('Error in config file')
  const errorMessages = errors.map((e) => {
    return {
      property: e.property,
      constraints: e.constraints,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value: e.value,
    }
  })
  throw errorMessages
}

const envConfig = configServer

export default envConfig
