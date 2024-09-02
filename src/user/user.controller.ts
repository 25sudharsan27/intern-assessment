import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/deleteuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';

@Controller('api')
export class UserController {
    constructor(private readonly userservice: UserService) { }

    @Post('login')
    async login(@Body() loginDto: { email: string, password: string }): Promise<{ access_token: string }> {
        // Validate presence of email and password
        if (!loginDto.email || !loginDto.password) {
            throw new BadRequestException('Email and password must be provided');
        }
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
        if (isNaN(userId)) {
            throw new BadRequestException('Invalid user ID');
        }
        const user = await this.userservice.findOne(userId);
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return user;
    }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async create(@Body() createUserDto: CreateUserDto): Promise<any> {
        return this.userservice.create(createUserDto);
    }

    @Delete()
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async delete(@Body() deleteUser: DeleteUserDto): Promise<any> {
        // Validate presence of required fields
        if (!deleteUser.email || !deleteUser.password || !deleteUser.confirmation) {
            throw new BadRequestException('Email, password, and confirmation are required');
        }
        return this.userservice.deleteById(deleteUser);
    }

    @Put()
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async update(@Body() updatedUser: UpdateUserDto): Promise<any> {
        // Validate presence of authentication token
        if (!updatedUser.authentication) {
            throw new BadRequestException('Authentication token is required');
        }
        return this.userservice.update(updatedUser);
    }
}
