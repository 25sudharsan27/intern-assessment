import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/deleteuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';

@Controller('api')
export class UserController {
    constructor(private readonly userservice: UserService) { }

    @Post('login')
    async login(@Body() loginDto: { email: string, password: string }): Promise<{ access_token: string }> {
        return this.userservice.login(loginDto.email, loginDto.password);
    }

    @Get()
    async findAll(): Promise<any[]> {
        return this.userservice.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<any> {
        // Convert id from string to number
        const userId = parseInt(id, 10);
        const user = await this.userservice.findOne(userId);
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return user;
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() createUserDto: CreateUserDto): Promise<any> {
        return this.userservice.create(createUserDto);
    }

    @Delete()
    async delete(@Body() deleteUser: DeleteUserDto): Promise<any> {
        return this.userservice.deleteById(deleteUser);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async update(@Body() updatedUser: UpdateUserDto): Promise<any> {
        return this.userservice.update(updatedUser);
    }
}
