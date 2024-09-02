// cats.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    private readonly cats = [];

    findAll(): string[] {
        return this.cats;
    }

    create(cat: string) {
        this.cats.push(cat);
    }
}
