import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  categories:string[];

  constructor(private bookService:BookService) {
    this.categories = bookService.getCategories();
   }

  ngOnInit(): void {

  }

}
