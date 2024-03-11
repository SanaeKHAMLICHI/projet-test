import {Routes} from "@angular/router";
import {AuthenticatedComponent} from "../authenticated/components/authenticated/authenticated.component";

export const groupsRoutes: Routes = [
  {
    path: 'form',
    loadComponent: () =>
      import('./components/group-form/group-form.component').then(
        (c) => c.GroupFormComponent,
      ),
    title: 'group-form',
  },
  {
    path: ':id',
    loadChildren: () =>
      import('../teams/teams.route').then(
        (r) => r.teamsRoutes,
      ),
  },

];
