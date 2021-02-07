import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Roles } from './enums/roles';
import { ILoginData } from './interfaces/loginData';
import { IRegisterData } from './interfaces/registerData';
import { IUser } from './interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  authChange = new Subject<boolean>();

  private user:IUser|null;

  constructor(private router:Router) { 
    this.user = {
      email: 'dimitur2204@gmail.com',
      firstName: 'Dimitar',
      lastName: 'Nizamov',
      password:'123465',
      role:Roles.author,
      id: '1',
      books:[],
      createdAt:new Date(),
      imageUrl:'',
    }
  };

  register(authData: IRegisterData){
    this.authSuccess();
  }

  login(authData: ILoginData){
    this.authSuccess();
  }

  logout(){
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return {...this.user};
  }

  isAuth(){
    return this.user !== null;
  }

  private authSuccess(){
    this.authChange.next(true);
    this.router.navigate(['/books']);
  }
}
