import { Component } from '@angular/core';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule , MatCardTitle } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import {FlexModule} from "@angular/flex-layout";
import {Router, RouterLink} from "@angular/router";
import {CommonModule, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AlertDialogComponent} from "../../../alert-dialog/alert-dialog.component";
import {AuthFormFacade} from "../../auth.facade";
import {Store} from "@ngrx/store";
import {MaterialModule} from "../../../material/material.module";
import {AuthFormComponent} from "../../../shared/components/auth-form/auth-form.component";
import {authStore, getState} from "../../state/auth.store";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialModule,
    FlexModule,
    RouterLink,
    //HomeComponent,
    NgIf,
    ReactiveFormsModule,
    CommonModule,
    AuthFormComponent

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  constructor(
    private authFormFacade: AuthFormFacade ,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,

  ) {}
  onSubmit() {
    this.authFormFacade.authenticate(this.form).subscribe(() => {
      const state = getState();
      console.log("state",state);
      this.router.navigateByUrl('/');

    });
  }


}
