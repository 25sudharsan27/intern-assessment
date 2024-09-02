import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { DeleteUserDto } from './dto/deleteuser.dto';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { id } });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        
        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });

        return this.userRepository.save(user);
    }

    async deleteById(deleteUserDto: DeleteUserDto): Promise<void> {
        const { authentication, email, password, confirmation } = deleteUserDto;
        const tokenPayload = await this.canActivate(authentication);

        if (!tokenPayload) {
            throw new UnauthorizedException("Invalid token");
        }

        const user = await this.userRepository.findOne({ where: { email } });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (confirmation !== "confirm") {
            throw new UnauthorizedException("Confirmation not received");
        }

        await this.userRepository.delete(user.id);
    }

    async update(updatedUserDto: UpdateUserDto): Promise<User> {
        const { authentication, name, place } = updatedUserDto;
        const tokenPayload = await this.canActivate(authentication);

        if (!tokenPayload) {
            throw new UnauthorizedException("Invalid token");
        }

        const user = await this.userRepository.findOne({ where: { id: tokenPayload.sub } });
        
        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        user.name = name ?? user.name;
        user.place = place ?? user.place;

        return this.userRepository.save(user);
    }

    async canActivate(auth: string): Promise<any> {
        if (!auth) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        try {
            const payload = this.jwtService.verify(auth);
            return payload; // Return the user payload
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    async login(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
