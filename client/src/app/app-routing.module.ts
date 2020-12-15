import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:HomeComponent
  },
  {
    path:'auth',
    children:[
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'register',
        component:RegisterComponent
      }
    ]
  },
  {
    path:'books',
    pathMatch:'full',
    component:BookListComponent,
    children:[
      {
        path:':id',
        component:BookListComponent,
      }
    ],
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
