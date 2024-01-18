import { knex as setupKnex } from 'knex';
import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    // client: 'sqlite3',
    // connection: {
    //     filename: './database/app.db'
    // },
    client: 'pg',
    connection: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    }, 
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

export const knex = setupKnex(config);
