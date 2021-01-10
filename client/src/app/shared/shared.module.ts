import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { LoaderComponent } from './loader/loader.component';
import { SideFilterComponent } from './side-filter/side-filter.component';



@NgModule({
  declarations: [NavigationComponent, FooterComponent, SearchComponent, LoaderComponent, SideFilterComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  exports:[
    NavigationComponent,
    FooterComponent,
    SearchComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
