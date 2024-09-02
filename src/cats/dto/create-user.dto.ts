// create-user.dto.ts

import { IsInt, IsString, IsEmail} from 'class-validator';

export class CreateUserDto {
    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    
}
