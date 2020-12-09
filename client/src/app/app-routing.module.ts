import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './book/book-list/book-list.component';
import { HomeComponent } from './core/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { UserRoutingModule } from './user/user-routing.module';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:HomeComponent
  },
  {
    path:'books',
    component:BookListComponent
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    UserRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
