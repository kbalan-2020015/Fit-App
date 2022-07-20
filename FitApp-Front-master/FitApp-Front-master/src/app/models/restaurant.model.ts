export class RestaurantModel{
    constructor(
        public name: string,
        public description: string,
        public address: string,
        public speciality: string,
        public calification: number,
        public open: string,
        public close: string,
        public phone: string,
        public calificationUser: Boolean,
        public client: String,

    ){}
}