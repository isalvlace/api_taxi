const { config } = require('dotenv')
const path = require('path')

config()

/* const {
  DB_HOST = 'mysql-container',
  DB_USER = 'root',
  DB_PASSWORD = 'rootpassword',
  DB_NAME = 'taxidb',
} = process.env

module.exports = {
  client: 'mysql2',
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
  pool: {
    min: 2,
    max: 15,
  },
  migrations: {
    directory: path.join(__dirname, 'migrations'),
    tableName: 'knex_migrations',
  },
} */

module.exports = {
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',   
    user: 'root',         
    password: '',  
    database: 'taxidb'    
  }
}
