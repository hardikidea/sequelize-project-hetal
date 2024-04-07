import logger from '../../utils/logger'
import config from '../config/config'

const env: string = process.env.NODE_ENV || 'development'
const dbConfig = config[env]

const { Client } = require('pg')

const client = new Client({
  host: dbConfig.host,
  port: 5432,
  user: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.dialect,
})

export const createDatabaseIfNotExist = async (dbName: string) => {
  try {
    await client.connect()
    const dbExists = await client.query(`SELECT 1 FROM pg_database WHERE datname='${dbName}'`)

    if (dbExists.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`)
      logger.info(`Server: [${dbConfig.host}] Database ${dbName} created.`)
    } else {
      logger.info(`Server: [${dbConfig.host}] Database ${dbName} already exists.`)
    }
  } catch (error) {
    logger.error('Unable to check or create the database:', error)
  } finally {
    await client.end()
  }
}
