import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ILoginData } from './interfaces/loginData';
import { IRegisterData } from './interfaces/registerData';
import { IUser } from './interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  authChange = new Subject<boolean>();
  private user:IUser | null;

  constructor(private router:Router) { 
    this.user = null;
  }

  register(authData: IRegisterData){
    this.user = {
      email: authData.email,
      firstName: authData.firstName,
      lastName: authData.lastName,
      id: Math.round(Math.random() * 10000).toString()
    }
    this.authSuccess();
  }

  login(authData: ILoginData){
    this.user = {
      email: authData.email,
      firstName: '',
      lastName: '',
      id: Math.round(Math.random() * 10000).toString()
    }
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
