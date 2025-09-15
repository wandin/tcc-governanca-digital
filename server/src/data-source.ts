import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User.js';
import { Proposal } from './entities/Proposal.js';
import { Vote } from './entities/Vote.js';
import { Audit } from './entities/Audit.js';

const {
  DB_HOST = 'localhost',
  DB_PORT = '5432',
  DB_USER = 'postgres',
  DB_PASS = 'postgres',
  DB_NAME = 'governanca',
} = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  synchronize: true, // para protótipo. Em produção, use migrações!
  logging: false,
  entities: [User, Proposal, Vote, Audit],
});
