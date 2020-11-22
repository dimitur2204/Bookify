import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BookDetailComponent } from './book-detail/book-detail.component';



@NgModule({
  declarations: [BookDetailComponent],
  imports: [
    CommonModule,
    HttpClient
  ]
})
export class BookModule { }
