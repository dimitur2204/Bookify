import { Injectable } from '@angular/core';
import { Categories } from './enums/categories';
import { IBook } from './interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  getBooks():IBook[]{
    return [
      {
        title:'Harry Potter',
        price:11,
        categories:[Categories['Literature and Fiction']],
        createdAt:new Date()
      },
      {
        title:'Lord of the Rings',
        price:10,
        categories:[Categories['Literature and Fiction']],
        createdAt:new Date()
      }
    ]
  }
}
