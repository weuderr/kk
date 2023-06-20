import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const postgres = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
};
const uri = `postgres://${postgres.username}:${postgres.password}@${postgres.host}`;
const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: uri,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};

export { databaseConfig };
