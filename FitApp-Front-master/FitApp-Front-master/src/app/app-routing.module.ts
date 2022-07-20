import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/users/user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FoodComponent } from './components/foods/food.component';
import {RoutineComponent} from './components/routines/routine.component';
import {AboutUsComponent} from './components/aboutUs/aboutUs.component';
import {RestaurantComponent} from './components/restaurants/restaurant.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'users', component: UserComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'food', component: FoodComponent},
  {path: 'routine', component: RoutineComponent},
  {path: 'about', component: AboutUsComponent},
  {path: 'restaurant', component: RestaurantComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
