import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { IUserInfo } from '../shared/interfaces/userInfo';

import {environment} from '../../environments/environment';
import { IAuthResponse } from '../shared/interfaces/authResponse';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get isLogged():Observable<boolean>{
    return this.http.get<boolean>(environment.apiUrl + '/auth/me',{withCredentials:true})
    .pipe(
      map (() => true),
      catchError(() => of(false))
    )
  }

  constructor(private http:HttpClient) {
   }

  register(userInfo:IUserInfo):Observable<IAuthResponse>{
    return this.http.post<IAuthResponse>(environment.apiUrl+'/auth/register',userInfo, {withCredentials:true});
  }

  logIn():void{
    
  }

  logOut():void{
    
  }
}
