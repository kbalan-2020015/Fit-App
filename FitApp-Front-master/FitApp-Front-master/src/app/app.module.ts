import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent} from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/users/user.component';
import { SearchPipe } from './pipes/search.pipe';
import {ProfileComponent} from './components/profile/profile.component';
import {FoodComponent} from './components/foods/food.component';
import { ClientPipe } from './pipes/client.pipe';
import {RoutineComponent} from './components/routines/routine.component';
import {AboutUsComponent} from './components/aboutUs/aboutUs.component';
import {RestaurantComponent} from './components/restaurants/restaurant.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    SearchPipe,
    ProfileComponent,
    FoodComponent,
    ClientPipe,
    RoutineComponent,
    AboutUsComponent,
    RestaurantComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
