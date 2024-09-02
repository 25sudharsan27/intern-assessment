import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/deleteuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';

@Controller('api')
export class CatsController {
    constructor(private readonly catsService: CatsService) { }

    @Post('login')
    async login(@Body() loginDto: { email: string, password: string }): Promise<{ access_token: string }> {
        return this.catsService.login(loginDto.email, loginDto.password);
    }

    @Get()
    async findAll(): Promise<any[]> {
        return this.catsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<any> {
        // Convert id from string to number
        const userId = parseInt(id, 10);
        const user = this.catsService.findOne(userId);
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return user;
    }
    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() createUserDto: CreateUserDto): Promise<{ user: any }> {
        return this.catsService.create(createUserDto);
    }

    @Delete()
    
    async delete(@Body() deleteUser : DeleteUserDto): Promise<any> {
        await this.catsService.deletebyId(deleteUser);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async update(@Body() updatedUser: UpdateUserDto): Promise<any> {
        
        return this.catsService.update(updatedUser);
    }
}
