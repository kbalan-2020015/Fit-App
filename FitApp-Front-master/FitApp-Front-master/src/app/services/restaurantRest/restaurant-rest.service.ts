import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import { environment } from "src/environments/environment";
import {UserRestService} from "../userRest/user-rest.service";

@Injectable({
  providedIn: 'root'
})

export class RestaurantRestService{
    httpOptions = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userRest.getToken(),
    });

    constructor(
        private http: HttpClient,
        private userRest: UserRestService
    ){}

    getRestaurants(){
        return this.http.get(environment.baseUrl + 'restaurant/getRestaurants',{headers:this.httpOptions});
    }

    getRestaurant(id:string){
        return this.http.get(environment.baseUrl + 'restaurant/getRestaurant/' + id,{headers:this.httpOptions});
    }

    newRestaurant(params:{}){
        return this.http.post(environment.baseUrl + 'restaurant/newRestaurant',params,{headers: this.httpOptions});
    }

    updateRestaurant(id:string, params:{}){
        return this.http.put(environment.baseUrl +'restaurant/updateRestaurant/'+id,params,{headers: this.httpOptions});
    }

    deleteRestaurant(id:string){
        return this.http.delete(environment.baseUrl +'restaurant/deleteRestaurant/'+id,{headers: this.httpOptions});
    }
}