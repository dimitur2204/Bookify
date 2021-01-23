import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Categories } from '../enums/categories';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {

  categories:String[];

  constructor() { 
    this.categories = [];
  }

  ngOnInit(): void {
    this.categories = Object
      .keys(Categories)
      .filter(c => typeof Categories[c as any] !== 'string');
  }

  onSubmit(form:Form){

  }

  handleFileInput(files:File[]){
    console.log(files);
  }
}
