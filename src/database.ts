import logger from '@utils/logger';
import { sequelize } from './database/models/sync-model'
import { ConnectionError } from 'sequelize';
import { createDatabaseIfNotExist } from 'database/config/createDatabase';
import config from '@config/config';
import { exec } from 'child_process';

const env: string = process.env.NODE_ENV || 'development'
const dbConfig = config[env]

export const ValidateAuthentication = (isSync: boolean) => {
  sequelize
    .authenticate()
    .then(async () => {
      await runMigrations();
      await syncDBase(isSync)
    })
    .catch(async (err: any) => {
      if(err instanceof ConnectionError) {
        logger.error(`Error: [${dbConfig.host}] database not found. Creating database...`)
        await createDatabaseIfNotExist(dbConfig.database!);
        await runMigrations();
        await syncDBase(isSync);
      }
    });
}

const runMigrations = () => {
  return new Promise((resolve, reject) => {
    const migrateCommand = `npm run migrate:dev`;

    exec(migrateCommand, { env: process.env }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

const syncDBase = async (isForce: boolean) => {
  await sequelize.sync({ force: isForce }).catch((err: any) => console.error('Error synchronizing models:', err))
  logger.info(`syncDBase: Server: [${dbConfig.host}] Database & tables synchronized successfully.`)
}
