import { Component } from '@angular/core';
import {HeaderComponent} from "../../../shared/components/header/header.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-authenticated',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './authenticated.component.html',
  styleUrl: './authenticated.component.css'
})
export class AuthenticatedComponent {

}
