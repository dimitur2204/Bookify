import { Component, Input, OnInit } from '@angular/core';
import { IBook } from 'src/app/shared/interfaces/book';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss']
})
export class BookListItemComponent implements OnInit {

  @Input() public book:IBook | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

}
