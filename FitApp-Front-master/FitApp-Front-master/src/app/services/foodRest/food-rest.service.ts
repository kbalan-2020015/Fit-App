import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { UserRestService } from "../userRest/user-rest.service";

@Injectable({
    providedIn: 'root'
})

export class FoodRestService{
    httpOptions = new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': this.userRest.getToken(),
    });

    constructor(
        private http : HttpClient,
        private userRest: UserRestService
    ){}

    getFoods(){
        return this.http.get(environment.baseUrl + 'food/getFoods',{headers:this.httpOptions});
    }

    getFood(id:string){
        return this.http.get(environment.baseUrl + 'food/getFood/' + id,{headers: this.httpOptions});
    }

    newFood(params:{}){
        return this.http.post(environment.baseUrl + 'food/newFood', params,{headers: this.httpOptions});
    }

    updateFood(id:string, params:{}){
        return this.http.put(environment.baseUrl + 'food/updateFood/' + id,params,{headers:this.httpOptions});
    }

    deleteFood(id:string){
        return this.http.delete(environment.baseUrl + 'food/deleteFood/'+ id,{headers:this.httpOptions});
    }
}