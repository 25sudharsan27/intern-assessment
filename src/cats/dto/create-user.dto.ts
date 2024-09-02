// create-user.dto.ts

import { IsInt, IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;

    @IsString()
    place : string;
}
