import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { User } from './user/entities/user.entity';

dotenvConfig({ path: '.env' });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: `${process.env.DB_DIALECT}` as 'postgres',
      host: `${process.env.DB_HOST}`,
      port: parseInt(process.env.DB_PORT),
      username: `${process.env.DB_USER}`,
      password: `${process.env.DB_PWD}`,
      database: `${process.env.DB_NAME}`,
      entities: [User],
      synchronize: true,
      logging: true,
    }),
    UserModule,
  ],
})
export class UserServiceModule {}
