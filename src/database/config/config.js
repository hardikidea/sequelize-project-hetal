require('dotenv').config(); // This line is important!

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'postgres',
    // use_env_variable: 'DATABASE_URL',
    // dialect: process.env.DB_DIALECT,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false // Note: This might be necessary for certain cloud providers.
    //   }
    // }
  },
};
