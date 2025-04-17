import fs from 'fs'
import path from 'path'

// check .env file

if (!fs.existsSync(path.resolve('.env'))) {
  console.log('No .env file found')
  process.exit(1)
}

class ConfigSchema {
  DATABASE_URL: string
  ACCESS_TOKEN_SECRET: string
  ACCESS_TOKEN_EXPIRES_IN: string
  REFRESH_TOKEN_SECRET: string
  REFRESH_TOKEN_EXPIRES_IN: string
}
