import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
    transform(users: any, search: any) {
        if (search === undefined) {
            return users;
        } else {
            return users.filter((user: any) => {
                return user.name.toLowerCase().includes(search.toLowerCase());
            })
        }
    }
}