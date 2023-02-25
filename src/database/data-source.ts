import { join } from 'path';

import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const baseConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
};

const configurations = {
  test: {
    ...baseConfig,
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
  },
  development: {
    ...baseConfig,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};

const dataSourceConfig = configurations[process.env.NODE_ENV];

const dataSource = new DataSource({
  ...dataSourceConfig,
  migrations: [join(__dirname, 'migrations', '*')],
  entities: ['src/**/*.entity{.ts,.js}'],
});

export { dataSourceConfig };
export default dataSource;
