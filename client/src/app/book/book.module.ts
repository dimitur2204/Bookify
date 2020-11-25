import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {MatGridListModule} from '@angular/material/grid-list';

import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list/book-list-item/book-list-item.component';



@NgModule({
  declarations: [BookDetailComponent, BookListComponent, BookListItemComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatGridListModule
  ],
  exports:[
    BookListComponent,
    BookDetailComponent
  ]
})
export class BookModule { }
