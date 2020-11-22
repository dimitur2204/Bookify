import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from '../shared/interfaces/book';
import {environment} from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BookService {

  loadBooks():Observable<IBook[]>{
    return this.http.get<IBook[]>(apiUrl+'books');
  }

  loadBook(id:string):Observable<IBook>{
    return this.http.get<IBook>(apiUrl+`books/${id}`);
  }
  constructor(private http: HttpClient) { }
}
