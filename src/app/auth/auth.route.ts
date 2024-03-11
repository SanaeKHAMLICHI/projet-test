import {Routes} from "@angular/router";

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (c) => c.LoginComponent,
      ),
    title: 'Se connecter',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(
        (c) => c.RegisterComponent,
      ),
    title: 'S\'inscrire',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
