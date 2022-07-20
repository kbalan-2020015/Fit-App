export class RoutineModel{
    constructor(
        public name: string,
        public week: string,
        public day: string,
        public description: string,
        public time: string,
        public dificultyLevel: number,
        public priority: number,
        public complete: boolean,
        public client: string
    ){}
}