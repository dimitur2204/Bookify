import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { BookService } from '../book.service';
import { Categories } from '../enums/categories';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  categories:String[];

  constructor(private bookService:BookService) { 
    this.categories = [];
  }

  ngOnInit(): void {
    this.categories = this.bookService.getCategories();
  }

  onSubmit(form:Form){

  }

  handleFileInput(files:File[]){
    console.log(files);
  }
}
