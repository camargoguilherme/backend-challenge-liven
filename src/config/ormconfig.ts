import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const typeormConfig: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: ['error'],
  synchronize: false,
  entities: [join(__dirname, '../app/models/**{.ts,.js}')],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export = typeormConfig;
