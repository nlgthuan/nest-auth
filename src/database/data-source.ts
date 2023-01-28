import { join } from 'path';

import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const dataSourceConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
} as const;

const dataSource = new DataSource({
  ...dataSourceConfig,
  migrations: [join(__dirname, 'database')],
  entities: ['src/**/*.entity{.ts,.js}'],
});

export { dataSourceConfig };
export default dataSource;
