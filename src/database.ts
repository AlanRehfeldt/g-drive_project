import { knex as setupKnex } from 'knex';
import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    client: 'sqlite3',
    connection: {
        filename: './database/app.db'
    },
  // client: 'pg',
  // connection: {
  //   connectionString: process.env.DATABASE_URL,
  //   host: process.env.HOST,
  //   port: process.env.DATABASE_PORT,
  //   user: process.env.USER,
  //   database: process.env.DATABASE,
  //   password: process.env.PASSWORD,
  //   ssl: false,
  // }, 
    useNullAsDefault: true,
    migrations: {
        directory: './database/migrations',
        extension: 'ts'
    }, 
    seeds: {
        directory: './database/seeds',
        extension: 'ts'
    }
}

console.log('Knex Config:', config);

export const knex = setupKnex(config);

// Testar a conexão
knex.raw('SELECT 1')
    .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso!'))
    .catch(error => console.error('Erro ao conectar ao banco de dados:', error.message));