import {IsString, IsInt, IsPositive,IsEmail } from 'class-validator';


export class DeleteUserDto {
    @IsString()
    authentication: string;

    @IsString()
    confirmation : string;

    @IsEmail()
    email : string;

    @IsString()
    password : string;
}
