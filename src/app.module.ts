import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './cats/entity/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE as 'postgres'), // Ensure this matches your database type
      host: process.env.DB_HOST , // Provide defaults if necessary
      port: parseInt(process.env.DB_PORT, 10) , // Default Postgres port
      username: process.env.DB_USER_NAME ,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User], // Include your entities
      synchronize: true,
      logging: true,
    }),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
