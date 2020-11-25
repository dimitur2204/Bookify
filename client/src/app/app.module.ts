import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
<<<<<<< HEAD
import { UserRoutingModule } from "./user/user-routing.module";
=======
import { BookModule } from './book/book.module';
>>>>>>> feat/navbar

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
<<<<<<< HEAD
    UserRoutingModule
=======
    BookModule
>>>>>>> feat/navbar
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
