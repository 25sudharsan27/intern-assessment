// cats.module.ts

import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({
    imports : [
        TypeOrmModule.forFeature([User])        ,
        JwtModule.register({
            secret:process.env.JWT_SECRET ,
            signOptions : { expiresIn : process.env.JWT_EXPIRATION },
        }),
    ],

    controllers: [CatsController],
    providers: [CatsService],
})
export class CatsModule { }
