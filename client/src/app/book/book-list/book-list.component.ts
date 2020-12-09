import { Component, OnInit } from '@angular/core';
import { IBook } from 'src/app/shared/interfaces/book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  public books:IBook[] = [];

  constructor(private bookService:BookService) { }

  ngOnInit(): void {
    this.bookService.loadBooks().subscribe(books => {
      this.books = books;
    })
  }

}
