import { Component, OnInit } from "@angular/core";
import { UserRestService } from "src/app/services/userRest/user-rest.service";
import { FoodRestService } from "src/app/services/foodRest/food-rest.service";
import { UserAdminRestService } from "src/app/services/userAdminRest/user-admin-rest.service";
import { FoodModel } from "src/app/models/food.model";
import { UserModel } from "src/app/models/user.model";
import Swal from "sweetalert2";

@Component({
    selector: 'app-food',
    templateUrl: './food.component.html',
    styleUrls: ['./food.component.css']
})

export class FoodComponent implements OnInit {
    token: any;
    identity: any;
    role: any;
    foods: any;
    food: FoodModel;
    user: UserModel;
    search: string = '';
    users: any;
    foodUpdate: any;
    usersClient: any



    constructor(
        private userRest: UserAdminRestService,
        private foodRest: FoodRestService,
        public usersRest: UserRestService
    ) {
        this.food = new FoodModel('', '', '', '', '', '', '', '', '');
        this.user = new UserModel('','','','','','','','','','','','');


    }

    ngOnInit(): void {
        this.getFoods();
        this.getUsers();
        this.getClients();
        this.token = this.usersRest.getToken();
        this.identity = this.usersRest.getIdentity();
        this.role = this.usersRest.getIdentity().role;
    }

    getFoods() {
        this.foods = [];
        this.foodRest.getFoods().subscribe({
            next: (res: any) => {
                this.foods = res.foods,
                    console.log(res);
            },
            error: (err) => console.log(err)
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

    getClients(){
        this.userRest.getClients().subscribe({
            next:(res:any)=>{
                this.usersClient = res.usersExist
            }
        })
    }

    newFood(newFoodForm: any) {
        this.foodRest.newFood(this.food).subscribe({
            next: (res: any) => {
                Swal.fire({
                    icon: 'success',
                    title: res.message,
                    confirmButtonColor: '#28B463'
                });
                this.getFoods();
                newFoodForm.reset();
            },
            error: (err: any) => {
                Swal.fire({
                    icon: 'error',
                    title: err.error.message || err.error,
                    confirmButtonColor: '#E74C3C'
                });
                newFoodForm.reset();
            }
        })
    }

    getFood(id: string) {
        this.foodRest.getFood(id).subscribe({
            next: (res: any) => {
                this.foodUpdate = res.food;
            },
            error: (err) => { alert(err.error.message) }
        })
    }

    updateFood() {
        this.foodRest.updateFood(this.foodUpdate._id, this.foodUpdate).subscribe({
            next: (res: any) => {
                Swal.fire({
                    icon: 'success',
                    title: res.message,
                    confirmButtonColor: '#E74C3C'
                });
                this.getFoods();
            },
            error:(err)=>{
                Swal.fire({
                    icon: 'error',
                    title: err.error.message || err.error,
                });
            },

        })
    }

    deleteFood(id:string){
        Swal.fire({
            title: 'Are you sure you want to delete this recipe?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: 'Cancel',
            confirmButtonColor: '#DC3311',
            denyButtonColor: '#118CDC'
        }).then((result)=>{
            if(result.isConfirmed){
                this.foodRest.deleteFood(id).subscribe({
                    next:(res:any)=>{
                        Swal.fire({
                            icon: 'success',
                            title: res.message + '  "' + res.deleteFood.name + '"  '  +' has been deleted ',
                            position: 'center',
                            showConfirmButton: true,
                            timer: 2000
                        });
                        this.getFoods();
                    },
                    error:(err)=>{
                        Swal.fire({
                            icon: 'error',
                            title: err.error.message
                        })
                        this.getFoods();
                    }
                })
            }
        })
    }
}
    