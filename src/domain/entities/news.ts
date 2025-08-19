export class News {
    constructor(
        public readonly id: string,
        public title: string,
        public content: string,
        public adminId: string,
        public author: string,
        public photo: string,
        public date: Date = new Date()
    ){}
}