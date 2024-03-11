import {Routes} from "@angular/router";

export const teamsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/teams/teams.component').then(
        (c) => c.TeamsComponent,
      ),
    title: 'teams',
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('../group/components/group-form/group-form.component').then(
        (c) => c.GroupFormComponent,
      ),
    title: 'group-form',
  },


];
