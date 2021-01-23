import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from '../book.service';
import { IBook } from '../interfaces/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort | null;

  displayedColumns = ['date','title','price'];
  
  dataSource = new MatTableDataSource<IBook>();

  constructor(private bookService: BookService) {
    this.sort = null;
  }

  ngOnInit(): void {
    this.dataSource.data = this.bookService.getBooks();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  filterTable(filter:string){
    this.dataSource.filter = filter.trim().toLowerCase();
  }

}
