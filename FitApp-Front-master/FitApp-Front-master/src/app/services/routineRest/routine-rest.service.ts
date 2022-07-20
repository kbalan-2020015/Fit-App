import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { UserRestService } from "../userRest/user-rest.service";

@Injectable({
    providedIn: 'root'
})

export class RoutineRestService{
    httpOptions = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userRest.getToken(),
    });

    constructor(

        private http: HttpClient,
        private userRest: UserRestService
    ){}

    getRoutines(){
        return this.http.get(environment.baseUrl + 'routine/getRoutines',{headers:this.httpOptions});
    }

    getRoutine(id:string){
        return this.http.get(environment.baseUrl + 'routine/getRoutine/' + id,{headers: this.httpOptions});
    }

    newRoutine(params:{}){
        return this.http.post(environment.baseUrl + 'routine/newRoutine', params,{headers: this.httpOptions});
    }

    updateRoutine(id:string,params:{}){
        return this.http.put(environment.baseUrl + 'routine/updateRoutine/' + id,params,{headers: this.httpOptions});
    }

    deleteRoutine(id:string){
        return this.http.delete(environment.baseUrl + 'routine/deleteRoutine/' + id,{headers: this.httpOptions});
    }

}