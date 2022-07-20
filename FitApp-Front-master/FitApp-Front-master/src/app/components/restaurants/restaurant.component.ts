import { Component, OnInit } from "@angular/core";
import { UserRestService } from "src/app/services/userRest/user-rest.service";
import { RestaurantRestService } from "src/app/services/restaurantRest/restaurant-rest.service";
import { UserAdminRestService } from "src/app/services/userAdminRest/user-admin-rest.service";
import { RestaurantModel } from "src/app/models/restaurant.model";
import Swal from "sweetalert2";

@Component({
    selector: 'app-restaurant',
    templateUrl: './restaurant.component.html',
    styleUrls: ['./restaurant.component.css']
})

export class RestaurantComponent implements OnInit {
    token: any;
    identity: any;
    role: any;
    restaurants: any;
    restaurant: RestaurantModel;
    search: string = '';
    users: any;
    restaurantUpdate: any;
    usersClient: any

    constructor(
        private userRest: UserAdminRestService,
        private restaurantRest: RestaurantRestService,
        public usersRest: UserRestService,
    ){
        this.restaurant = new RestaurantModel('','','','',0,'','','',false,'');
    }

    ngOnInit(): void {
        this.getRestaurants();
        this.getUsers();
        this.getClients();
        this.token = this.usersRest.getToken();
        this.identity = this.usersRest.getIdentity();
        this.role = this.usersRest.getIdentity().role;
    }

    getRestaurants(){
        this.restaurants=[];
        this.restaurantRest.getRestaurants().subscribe({
            next:(res:any)=>{
                this,this.restaurants = res.restaurants;
                console.log(res)
            },
            error:(err)=> console.log(err)
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

    newRestaurant(newRestaurantForm:any){
        this.restaurantRest.newRestaurant(this.restaurant).subscribe({
            next:(res:any)=>{
                Swal.fire({
                    icon: 'success',
                    title: res.message,
                    confirmButtonColor: '#28B463'
                });
                this.getRestaurants();
                newRestaurantForm.reset();
            },
            error:(err:any)=>{
                Swal.fire({
                    icon: 'error',
                    title: err.error.message || err.error,
                    confirmButtonColor: '#E74C3C'
                })
                newRestaurantForm.reset();
            }
        })
    }

    getRestaurant(id:string){
        this.restaurantRest.getRestaurant(id).subscribe({
            next:(res:any)=>{
                this.restaurantUpdate = res.restaurant;
            },
            error:(err)=>{alert(err.error.message)}
        })
    }

    updateRestaurant(){
        this.restaurantRest.updateRestaurant(this.restaurantUpdate._id,this.restaurantUpdate).subscribe({
            next:(res:any)=>{
                Swal.fire({
                    icon: 'success',
                    title: res.message,
                    confirmButtonColor: '#E74C3C'
                });
                this.getRestaurants();
            },
            error:(err)=>{
                Swal.fire({
                    icon: 'error',
                    title: err.error.message || err.error,
                });
            },
        })
    }

    deleteRestaurant(id:string){
        Swal.fire({
            title: 'Are you sure you want to delete this restaurant?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: 'Cancel',
            confirmButtonColor: '#DC3311',
            denyButtonColor: '#118CDC'
        }).then((result)=>{
            if(result.isConfirmed){
                this.restaurantRest.deleteRestaurant(id).subscribe({
                    next:(res:any)=>{
                        Swal.fire({
                            icon: 'success',
                            title: res.message + '  "' + res.deleteRestaurant.name + '"  '  +' has been deleted ',
                            position: 'center',
                            showConfirmButton: true,
                            timer: 2000
                        });
                        this.getRestaurants();
                    },
                    error:(err)=>{
                        Swal.fire({
                            icon: 'error',
                            title: err.error.message
                        })
                        this.getRestaurants();
                    }
                })
            }
        })
    }
}