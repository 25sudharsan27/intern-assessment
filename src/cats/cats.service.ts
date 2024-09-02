// cats.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    private readonly users = [
        // Example data
        { id: 1, name: 'Sudharsan', email: 'sudharsan@example.com' },
        { id: 2, name: 'John Doe', email: 'john@example.com' }
    ];
    findAll(): any[] {
        return this.users;
    }

    findOne(id : number) : any {
        return this.users.find(user => user.id === id);
    }

    create(user: {id : number , name : string, email : string}) {
        this.users.push(user);
    }

    deletebyId(id : number) : any{
        const index = this.users.findIndex(user => user.id === id);

        if(index !==-1){
            this.users.splice(index,1);
        }
    }

    update(id: number, updatedUser: { name: string; email: string }): any {
        const user = this.users.find(user => user.id === id);
        if (user) {
            user.name = updatedUser.name;
            user.email = updatedUser.email;
            return user;
        }
        return null;
    }


}
