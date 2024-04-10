import fs from 'fs'
import path from 'path'
import { Sequelize } from 'sequelize'
import config from '../config/config' // Adjust the import based on your actual config path

const basename: string = path.basename(__filename)
const env: string = process.env.NODE_ENV || 'development'

const dbConfig = config[env]
// console.log(dbConfig)

let sequelize: Sequelize
sequelize = new Sequelize(dbConfig.database!, dbConfig.username!, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false,
})

const dBase: { [key: string]: any } = {}
fs.readdirSync(__dirname)
  .filter((file: string) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts' && !file.endsWith('.test.ts')
  })
  .forEach((file: string) => {
    const model = require(path.join(__dirname, file)) //.default(sequelize, DataTypes);
    dBase[model.name] = model
  })

Object.keys(dBase).forEach((modelName: string) => {
  if (dBase[modelName].associate) {
    dBase[modelName].associate(dBase)
  }
})

dBase.sequelize = sequelize
dBase.Sequelize = Sequelize

export { sequelize, dBase }
