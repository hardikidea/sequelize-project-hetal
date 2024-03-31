import { sequelize } from './database/models/database-model'

export const ValidateAuthentication = (isSync: boolean) => {
  sequelize
    .authenticate()
    .then(async () => {
      console.log('Database connected.')
      await syncDBase(isSync)
    })
    .catch((err: any) => console.error('Unable to connect to the database:', err))
}

const syncDBase = async (isForce: boolean) => {
  await sequelize.sync({ force: isForce }).catch((err: any) => console.error('Error synchronizing models:', err))
}
