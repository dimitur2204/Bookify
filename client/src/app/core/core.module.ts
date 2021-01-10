import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { BookModule } from '../book/book.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SideFilterComponent } from './side-filter/side-filter.component';




@NgModule({
  declarations: [HomeComponent, SideFilterComponent],
  imports: [
    CommonModule,
    SharedModule,
    BookModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports:[HomeComponent]
})
export class CoreModule { }
