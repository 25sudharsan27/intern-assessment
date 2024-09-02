// cats.module.ts

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
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

    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }
