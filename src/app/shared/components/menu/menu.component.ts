import { Component } from '@angular/core';
import {MaterialModule} from "../../../material/material.module";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {Router, RouterLink} from "@angular/router";
import {GroupDto} from "../../../group/state/group.model";
import {GroupFacade} from "../../../group/group.facade";
import {CommonModule, NgForOf} from "@angular/common";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MaterialModule,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    RouterLink,
    NgForOf
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  groups: GroupDto[] = [];

  constructor(private router: Router,private groupFacade : GroupFacade) {

    this.groupFacade.getGroups().subscribe({
      next: (groups: GroupDto[]) => {
        this.groups = groups;
      },
      error: (error: any) => console.error(error)
    });
  }

}
