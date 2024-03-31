import { Dialect } from 'sequelize/types'

interface DatabaseConfig {
  username: string
  password: string
  database: string
  host: string
  dialect: Dialect
}

const config: { [key: string]: DatabaseConfig } = {
  development: {
    username: process.env.DB_USERNAME || 'dev_default_username',
    password: process.env.DB_PASSWORD || 'dev_default_password',
    database: process.env.DB_DATABASE || 'dev_default_database',
    host: process.env.DB_HOST || 'dev_localhost',
    dialect: (process.env.DB_DIALECT as Dialect) || 'postgres',
  },
  production: {
    username: process.env.DB_USERNAME || 'prod_default_username',
    password: process.env.DB_PASSWORD || 'prod_default_password',
    database: process.env.DB_DATABASE || 'prod_default_database',
    host: process.env.DB_HOST || 'localhost',
    dialect: (process.env.DB_DIALECT as Dialect) || 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME || 'test_default_username',
    password: process.env.DB_PASSWORD || 'test_default_password',
    database: process.env.DB_DATABASE || 'test_default_database',
    host: process.env.DB_HOST || 'localhost',
    dialect: (process.env.DB_DIALECT as Dialect) || 'postgres',
  },
}

export default config
