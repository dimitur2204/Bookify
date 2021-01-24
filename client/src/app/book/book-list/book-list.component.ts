import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, AfterViewInit {

  regularDistribution = 100 / 3;

  constructor(private bookService: BookService) {
    
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    
  }

  filterTable(filter:string){
    
  }

}
