import { Admin } from "@prisma/client"

export class News {
    constructor(
        public readonly id: string,
        public title: string,
        public content: string,
        public author: Admin,
        public date: Date = new Date()
    ){}
}