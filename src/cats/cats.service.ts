// import { Injectable, UnauthorizedException,ExecutionContext } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcryptjs';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/updateuser.dto';
// import { DeleteUserDto } from './dto/deleteuser.dto';
// import { Repository } from 'typeorm';
// import { User } from './entity/user.entity';
// import { InjectRepository } from '@nestjs/typeorm';

// @Injectable()
// export class CatsService {

//     constructor(
//         @InjectRepository(User) private readonly userRepository: Repository<User>,
//       ) {}
    
//     // private readonly users = [
//     //     // Example data
//     //     { id: 1, name: 'Sudharsan', email: 'sudharsan@lpu.in', password: '$2a$10$EIX0siLQ2IR6l4B9vNlqUOl7vN6p9A/mxdT4i.mcdF4/Ot8lS/ZCa', place: "dindigul" },
//     //     { id: 2, name: 'John Doe', email: 'john@example.com', password: '$2a$10$X.W0p8yEJpT1CfBvERzzUecl6mItC7Jmf5K3Of7XoO9uqZ4vVDn8K', place: "madurai" }
//     // ];

//     constructor(private jwtService: JwtService) {}

//     findAll(): any[] {
//         return this.users;
//     }

//     async findOne(id: number): Promise<any> {
//         const usr = this.users.find(user => user.id === id);
//         return usr;
//     }


//     async create(createUserDto: CreateUserDto): Promise<{ user: any }> {

//         const user : User = new User();
        
//         user.name = createUserDto.name;
//         user.email = createUserDto.email;
//         user.place = createUserDto.place;
//         const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        
//         user.password = hashedPassword;

//         // this.users.push(user);
//         return this.userRepository.save(user);
//     }


//     async deletebyId(deleteuser : DeleteUserDto): Promise<any> {
//         const auth = deleteuser.authentication;
//         const val = await this.canActivate(auth);

//         if(!val){
//             throw new UnauthorizedException("some thing invalid with token");
//         }

//         const user = this.users.find(user => user.email === deleteuser.email);
//         const userIndex = this.users.findIndex(user => user.email === deleteuser.email);
//         if (!user || !(await bcrypt.compare(deleteuser.password, user.password))) {
//             throw new UnauthorizedException('Invalid credentials');
//         }
//         if(deleteuser.confirmation!== "confirm"){
//             throw new UnauthorizedException("confirmation Not Recieved");
//         }
        
//         console.log(userIndex);
//         this.users.splice(userIndex, 1);
        
//         console.log("User deleted his account");

//     }

//     async update(updatedUser: UpdateUserDto): Promise<any> {
//         const auth = updatedUser?.authentication;
        
//         // Add a debug log to inspect the `auth` value
//         console.log('Received authentication:', auth);
    
//         if (!auth) {
//             throw new UnauthorizedException('Token not present');
//         }
        
//         // Validate the token
//         const val = await this.canActivate(auth);
//         if (!val) {
//             throw new UnauthorizedException("Token is Invalid");
//         }
        
//         const user = await this.findOne(val.sub);
        
//         if (!user) {
//             throw new UnauthorizedException("User not found");
//         }
    
//         if (updatedUser?.name) {
//             user.name = updatedUser.name;
//         }
//         if (updatedUser?.place) {
//             user.place = updatedUser.place;
//         }
//         return { user };
//     }
    
//     async canActivate(auth: string): Promise<any> {
//         if (!auth) {
//             throw new UnauthorizedException('Authorization header is missing');
//         }
    

//         try {
//             const payload = this.jwtService.verify(auth);
//             return payload; // Return the user payload
//         } catch (error) {
//             throw new UnauthorizedException('Invalid token');
//         }
//     }
    

//     async login(email: string, password: string): Promise<{ access_token: string }> {
//         const user = this.users.find(user => user.email === email);
//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             throw new UnauthorizedException('Invalid credentials');
//         }
//         const payload = { email: user.email, sub: user.id };
//         return {
//             access_token: this.jwtService.sign(payload),
//         };
//     }
// }

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
export class CatsService {

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
