import { Component } from '@angular/core';
import {AuthFormFacade} from "../../auth/auth.facade";
import {ArticleService} from "../state/home.service";
import {Router, RouterLink} from "@angular/router";
import {Article} from "../state/home.model";
import {MaterialModule} from "../../material/material.module";
import {NgForOf} from "@angular/common";
import {FlexModule} from "@angular/flex-layout";
import {HeaderComponent} from "../../shared/components/header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MaterialModule,
    NgForOf,
    FlexModule,
    RouterLink,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  articlesList: Article[] = [];
  constructor(
    private authFacade: AuthFormFacade,
    private articlesService:ArticleService,
    private router: Router,

  ) {
    this.articlesList = this.articlesService.getArticles();
  }
  onLogout(){
    this.authFacade.logout()
    this.router.navigateByUrl('auth/login');
  }
}
