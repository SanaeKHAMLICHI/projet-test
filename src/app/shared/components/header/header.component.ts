import { Component } from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {AuthFormFacade} from "../../../auth/auth.facade";
import {ArticleService} from "../../../home/state/home.service";
import {Router, RouterLink} from "@angular/router";
import {MenuComponent} from "../menu/menu.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FlexModule,
    MatIcon,
    MatIconButton,
    RouterLink,
    MenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private authFacade: AuthFormFacade,
    private router: Router,

  ) {
  }
  onLogout(){
    this.authFacade.logout()
    this.router.navigateByUrl('auth/login');
  }
}
