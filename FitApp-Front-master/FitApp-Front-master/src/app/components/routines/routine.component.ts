import { Component, OnInit } from "@angular/core";
import { UserRestService } from "src/app/services/userRest/user-rest.service";
import { RoutineRestService } from "src/app/services/routineRest/routine-rest.service";
import { UserAdminRestService } from "src/app/services/userAdminRest/user-admin-rest.service";
import { RoutineModel } from "src/app/models/routine.model";
import Swal from "sweetalert2";

@Component({
    selector: 'app-routine',
    templateUrl: './routine.component.html',
    styleUrls: ['./routine.component.css']
})

export class RoutineComponent implements OnInit{
    token: any;
    identity: any;
    role: any;
    routines: any;
    routine: RoutineModel;
    search: string = '';
    users: any;
    routineUpdate: any;
    usersClient: any


    constructor(
        private userRest: UserAdminRestService,
        private routineRest: RoutineRestService,
        public usersRest: UserRestService,
    ){
        this.routine = new RoutineModel('','','','','',0,0,false,'');
    }

    ngOnInit(): void {
        this.getRoutines();
        this.getUsers();
        this.getClients();
        this.token = this.usersRest.getToken();
        this.identity = this.usersRest.getIdentity();
        this.role = this.usersRest.getIdentity().role;
    }

    getRoutines(){
        this.routines =[];
        this.routineRest.getRoutines().subscribe({
            next:(res:any)=>{
                this.routines = res.routines,
                console.log(res);
            },
            error:(err)=> console.log(err)
        })
    }

    getClients(){
        this.userRest.getClients().subscribe({
            next:(res:any)=>{
                this.usersClient = res.usersExist
            }
        })
    }

    getUsers() {
        this.userRest.getUsers().subscribe({
            next: (res: any) => {
                this.users = res.user,
                    console.log(this.users);
            },

            error: (err) => console.log(err)
        })
    }

    newRoutine(newRoutineForm:any){
        this.routineRest.newRoutine(this.routine).subscribe({
            next:(res:any)=>{
                Swal.fire({
                    icon: 'success',
                    title: res.message,
                    confirmButtonColor: '#28B463'
                });
                this.getRoutines();
                newRoutineForm.reset();
            },
            error:(err:any)=>{
                Swal.fire({
                    icon: 'error',
                    title: err.error.message || err.error,
                    confirmButtonColor: '#E74C3C'
                });
                newRoutineForm.reset();
            }
        })
    }

    getRoutine(id:string){
        this.routineRest.getRoutine(id).subscribe({
            next:(res:any)=>{
                this.routineUpdate = res.routine;
            },
            error:(err)=>{alert(err.error.message)}
        })
    }

    updateRoutine(){
        this.routineRest.updateRoutine(this.routineUpdate._id, this.routineUpdate).subscribe({
            next:(res:any)=>{
                Swal.fire({
                    icon: 'success',
                    title: res.message,
                    confirmButtonColor: '#E74C3C'
                });
                this.getRoutines();
            },
            error:(err)=>{
                Swal.fire({
                    icon: 'error',
                    title: err.error.message || err.error,
                });
            },
        })
    }

    deleteRoutine(id:string){
        Swal.fire({
            title: 'Are you sure you want to delete this routine?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: 'Cancel',
            confirmButtonColor: '#DC3311',
            denyButtonColor: '#118CDC'
        }).then((result)=>{
            if(result.isConfirmed){
                this.routineRest.deleteRoutine(id).subscribe({
                    next:(res:any)=>{
                        Swal.fire({
                            icon: 'success',
                            title: res.message + '  "' + res.deleteRoutine.name + '"  '  +' has been deleted ',
                            position: 'center',
                            showConfirmButton: true,
                            timer: 2000
                        });
                        this.getRoutines();
                    },
                    error:(err)=>{
                        Swal.fire({
                            icon: 'error',
                            title: err.error.message
                        })
                        this.getRoutines();
                    }
                })
            }
        })
    }
}