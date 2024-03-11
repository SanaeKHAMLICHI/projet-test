import { Component } from '@angular/core';
import {AuthFormComponent} from "../../../shared/components/auth-form/auth-form.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthFormFacade} from "../../auth.facade";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    AuthFormComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  }, {validator: this.checkPasswords });
  checkPasswords(group: FormGroup) {
    // @ts-ignore
    let pass = group.get('password').value;
    // @ts-ignore
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }
  constructor(
    private authFormFacade: AuthFormFacade ,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,

  ) {}
  onSubmit() {
    this.authFormFacade.register(this.form).subscribe(() => this.router.navigateByUrl('/'));
  }

}
