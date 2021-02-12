import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';

import { BookComponent } from './book/book/book.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { BookCreateComponent } from './book/book-create/book-create.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { BookListItemComponent } from './book/book-list-item/book-list-item.component';
import { FilterComponent } from './book/filter/filter.component';
import { ShoppingCartComponent } from './navigation/shopping-cart/shopping-cart.component';
import { CartComponent } from './shopping/cart/cart.component';
import { CartItemComponent } from './shopping/cart-item/cart-item.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    BookComponent,
    BookDetailsComponent,
    BookCreateComponent,
    BookListComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    BookListItemComponent,
    FilterComponent,
    ShoppingCartComponent,
    CartComponent,
    CartItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
