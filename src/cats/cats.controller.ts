// cats.controller.ts

import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api')
export class CatsController {
    constructor(private readonly catsService: CatsService) { }

    @Get()
    findAll(): any[] {
        return this.catsService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id') id: number): any {
        return this.catsService.findOne(Number(id));
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() user: CreateUserDto) {
        this.catsService.create(user);
    }

    @Delete(':id')
    delete(@Param('id') id: number): void {
        this.catsService.deleteById(Number(id));
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    update(@Param('id') id: number, @Body() updatedUser: { name: string; email: string }): any {
        return this.catsService.update(Number(id), updatedUser);
    }
}
