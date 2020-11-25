import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:HomeComponent
  },
<<<<<<< HEAD
  {
    path:'auth',
    redirectTo:'/auth'
  },
  {path: '**', component: PageNotFoundComponent}
=======
>>>>>>> feat/navbar
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
