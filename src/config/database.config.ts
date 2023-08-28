import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // Auto create database schema (ONLY FOR DEVELOPMENT)
};
