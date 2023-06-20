import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const mongo = {
  host: 'localhost',
  port: 27017,
  username: 'root',
  password: 'rootPassXXX',
};
const uri = `mongodb://${mongo.username}:${mongo.password}@${mongo.host}`;

const databaseConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: uri,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export { databaseConfig };
