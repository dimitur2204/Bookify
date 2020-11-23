import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [NavigationComponent, FooterComponent, SearchComponent],
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
    SearchComponent
  ]
})
export class SharedModule { }
