import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AppModule } from '../app.module';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule
  ],
  exports:[HomeComponent]
})
export class CoreModule { }
