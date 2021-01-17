import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BookComponent } from './book/book/book.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:WelcomeComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'books',
    component:BookComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
