import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class CatsService {
    private readonly users = [
        { id: 1, name: 'Sudharsan', email: 'sudharsan@example.com' },
        { id: 2, name: 'John Doe', email: 'john@example.com' }
    ];

    findAll(): any[] {
        return this.users;
    }

    findOne(id: number): any {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    create(user: { id: number; name: string; email: string }) {
        if (this.users.find(existingUser => existingUser.id === user.id)) {
            throw new BadRequestException(`User with ID ${user.id} already exists`);
        }
        this.users.push(user);
    }

    deleteById(id: number): void {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        this.users.splice(index, 1);
    }

    update(id: number, updatedUser: { name: string; email: string }): any {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        user.name = updatedUser.name;
        user.email = updatedUser.email;
        return user;
    }
}
