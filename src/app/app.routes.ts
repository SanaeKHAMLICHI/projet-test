import {RouterModule, Routes} from '@angular/router';
import { loginGuard} from "./auth/guards/auth.guard";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./auth/components/login/login.component";
import {HomeComponent} from "./home/component/home.component";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.route').then((r) => r.authRoutes)
  },{
    path: '',
    loadChildren: () =>
      import('./authenticated/authenticated.routes').then(
        (r) => r.authenticatedRoutes,
      ),
    canActivate: [loginGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
