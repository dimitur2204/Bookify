import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged:Subject<boolean> = new Subject<boolean>();

  constructor() { }

  logIn():void{
    this.isLogged.next(true);
  }

  logOut():void{
    this.isLogged.next(false);
  }
}
