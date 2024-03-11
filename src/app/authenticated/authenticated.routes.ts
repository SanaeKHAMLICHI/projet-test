import {Routes} from "@angular/router";
import {GroupFormComponent} from "../group/components/group-form/group-form.component";
import {loginGuard} from "../auth/guards/auth.guard";
import {HomeComponent} from "../home/component/home.component";
import {AuthenticatedComponent} from "./components/authenticated/authenticated.component";

export const authenticatedRoutes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'group',
    component: AuthenticatedComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../group/group.route').then(
            (r) => r.groupsRoutes,
          ),
      }
    ]
  }

]
