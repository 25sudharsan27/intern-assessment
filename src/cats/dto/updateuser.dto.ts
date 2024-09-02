import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name?: string;

    // @IsEmail()
    // @IsOptional()
    // email?: string;

    @IsString()
    @IsOptional()
    place?: string;

    @IsString()
    @IsOptional()
    authentication : string;
}
