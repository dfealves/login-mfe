import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component'


const routes: Routes = [
  {
    path: 'login', pathMatch: 'full',
    loadChildren: () => import('./login/login.module').then((mod) => mod.LoginModule)
  },
  {
    path: 'dashboard', component: EmptyRouteComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
