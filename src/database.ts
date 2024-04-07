import { sequelize } from './database/models/sync-model'
import { ConnectionError } from 'sequelize'
import { exec } from 'child_process'
import config from './database/config/config'
import logger from './utils/logger'
import { createDatabaseIfNotExist } from './database/config/createDatabase'

const env: string = process.env.NODE_ENV || 'development'
const dbConfig = config[env]

export const ValidateAuthentication = (isSync: boolean) => {
  sequelize
    .authenticate()
    .then(async () => {
      await runMigrations()
      await syncDBase(isSync)
    })
    .catch(async (err: any) => {
      if (err instanceof ConnectionError) {
        logger.error(`Error: [${dbConfig.host}] database not found. Creating database...`)
        await createDatabaseIfNotExist(dbConfig.database!)
        await runMigrations()
        await syncDBase(isSync)
      }
    })
}

const runMigrations = () => {
  return new Promise((resolve, reject) => {
    const migrateCommand = `npm run migrate:dev`

    exec(migrateCommand, { env: process.env }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        reject(error)
        return
      }
      resolve(stdout)
    })
  })
}

const syncDBase = async (isForce: boolean) => {
  await sequelize.sync({ force: isForce }).catch((err: any) => console.error('Error synchronizing models:', err))
  logger.info(`syncDBase: Server: [${dbConfig.host}] Database & tables synchronized successfully.`)
}
