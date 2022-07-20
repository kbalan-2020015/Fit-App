export class UserAdminModel{
    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public username: string,
        public email: string,
        public password: string,
        public phone: string,
        public gender: string,
        public age: string,
        public height: string,
        public weight: string,
        public role: string
    ){}
}