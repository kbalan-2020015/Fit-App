import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { UserRestService } from "../userRest/user-rest.service";

@Injectable({
    providedIn: 'root'
})

export class UserAdminRestService{
    httpOptions = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userRest.getToken(),
    });

    constructor(
        private http: HttpClient,
        private userRest: UserRestService
    ){}

    getUser(id:string){
        return this.http.get(environment.baseUrl + 'user/getUser/' + id,{headers: this.httpOptions});
    }

    getClients(){
        return this.http.get(environment.baseUrl + 'user/getClients', {headers: this.httpOptions});
      }

    getUsers(){
        return this.http.get(environment.baseUrl + 'user/getUsers', {headers: this.httpOptions});
    }

    newUser(params:{}){
        return this.http.post(environment.baseUrl + 'user/newUser', params,{headers:this.httpOptions});
    }

    updateUser(id:string,params:{}){
        return this.http.put(environment.baseUrl + 'user/update_Admin/' + id,params,{headers:this.httpOptions});
    }

    userDeleted(id:string){
        return this.http.delete(environment.baseUrl + 'user/delete_Admin/' +id,{headers: this.httpOptions})
    }
}