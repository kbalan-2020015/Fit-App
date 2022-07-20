import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
    name: 'client'
})
export class ClientPipe implements PipeTransform {
    transform(foods: any, search: any) {
        if (search === undefined) {
            return foods;
        } else {
            return foods.filter((food: any) => {
                return food.client.username.toLowerCase().includes(search.toLowerCase());
            })
        }
    }
}