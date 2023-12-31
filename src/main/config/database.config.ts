import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

let entities = ['src/app/shared/database/entities/**/*.ts'];
let migrations = ['src/app/shared/database/migrations/**/*.ts'];

if (process.env.DB_ENV === 'production') {
  entities = ['build/app/shared/database/entities/**/*.js'];
  migrations = ['build/app/shared/database/migrations/**/*.js'];
}

const config = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  schema: 'taskvault',
  entities,
  migrations,
});

export default config;
