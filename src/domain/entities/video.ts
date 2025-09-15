export class Video {
    constructor(
        public readonly id: string,
        public title: string,
        public description: string | null,
        public url: string,
        public filename: string,
        public duration: number | null,
    ) {}
}
