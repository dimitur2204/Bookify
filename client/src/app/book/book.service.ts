import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Categories } from './enums/categories';
import { IBook } from './interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private auth:AuthService) { }

  getBooks():IBook[]{
    return [
      {
        id:'1',
        title:'Harry Potter',
        description:'',
        price:11,
        categories:[Categories['Literature and Fiction']],
        createdAt:new Date(),
        user:this.auth.getUser(),
        buyers:[]
      },
      {
        id:'2',
        title:'Lord of the Rings',
        description:'',
        price:10,
        categories:[Categories['Literature and Fiction']],
        createdAt:new Date(),
        user:this.auth.getUser(),
        buyers:[]
      }
    ]
  }

  getCategories():string[]{
    return Object
      .keys(Categories)
      .filter(c => typeof Categories[c as any] !== 'string');
  }
}
