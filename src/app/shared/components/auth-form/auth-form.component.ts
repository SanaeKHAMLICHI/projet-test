
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, Validators, FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MaterialModule} from "../../../material/material.module";
import {FlexModule} from "@angular/flex-layout";
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FlexModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {
  @Input() form!: FormGroup ;
  @Input() registerMode: boolean | undefined;
  @Input() loginMode: boolean | undefined;

  @Output() submitForm: EventEmitter<void> = new EventEmitter<void>();

  onSubmit() {
    this.submitForm.emit();
  }

}
