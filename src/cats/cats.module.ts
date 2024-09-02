// cats.module.ts

import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports : [
        JwtModule.register({
            secret:'youSuperSecretKey',
            signOptions : { expiresIn : '1h'},
        }),
    ],

    controllers: [CatsController],
    providers: [CatsService],
})
export class CatsModule { }
