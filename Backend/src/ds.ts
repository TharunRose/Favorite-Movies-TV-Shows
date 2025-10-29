import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Movie } from './entity/Movie';
import dotenv from 'dotenv';


dotenv.config();


export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'tv_movie_shows',
    entities: [Movie],
    synchronize: true, 
    logging: false
});