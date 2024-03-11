import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {AlertDialogComponent} from "../alert-dialog/alert-dialog.component";
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {AuthService} from "./state/auth.service";
import { Store } from '@ngrx/store';
import {response} from "express";
import {AUTHENTICATED_STORE_NAME, authStore, trackAuthedRequestsStatus} from "./state/auth.store";
import {addEntities} from "@ngneat/elf-entities";
import {AuthenticationDto, AuthenticationResponseDto} from "./state/auth.model";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {updateRequestStatus} from "@ngneat/elf-requests";


@Injectable({ providedIn: 'root' })
export class AuthFormFacade {
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
  ) {}
  // @ts-ignore
  authenticate(form: FormGroup): Observable<AuthenticationResponseDto> {
    if (!form.valid) {
      this.dialog.open(AlertDialogComponent, {
        data: { message: 'Le formulaire contient des erreurs.' }
      });
      return throwError(() => new Error('Le formulaire contient des erreurs.'));
    }
    return this.authService.login(form.value).pipe(
      tap({
        next: (response: AuthenticationResponseDto) => {
          // Ajoutez l'utilisateur au store
          //console.log('Response User:', response.user);
          //console.log('Register reussi');

          //const user = { ...response.user, id: response.user._id, accessToken: response.accessToken };
          //const authenticatedUser: AuthenticationResponseDto = { user, accessToken: response.accessToken, id: response.user._id };
          //console.log('authenticatedUser:', authenticatedUser);
          authStore.update(
            (state) => ({
              ...state,
              user: {
                ...response.user,
              },
              authorizationHeader: response.accessToken,
            }),
          );
        },
          error: () => {
          this.dialog.open(AlertDialogComponent, {
            data: { message: 'Veuillez vérifier vos identifiants et réessayer.' }
          });
        }
      }),
      catchError(error => {
        this.dialog.open(AlertDialogComponent, {
          data: { message: 'Erreur de connexion. Veuillez réessayer.' }
        });
        return throwError(() => error);
      }),
    trackAuthedRequestsStatus(AUTHENTICATED_STORE_NAME),

  );
  }



  register(registerForm: FormGroup): Observable<any> {
    if (!registerForm.valid) {
      let message = '';
      if (registerForm.hasError('notSame')) {
        message = 'Les mots de passe saisis ne correspondent pas.';
      } else {
        message = 'Veuillez remplir correctement tous les champs requis.';
      }
      this.dialog.open(AlertDialogComponent, {
        data: { message: message }
      });
      return of(null);
    }
    const user = registerForm.value;
    return this.authService.addUser(user).pipe(
      tap({
        next: (response: AuthenticationResponseDto) => {
          // Ajoutez l'utilisateur au store
          console.log('Response User:', response.user);
          const user = { ...response.user, id: response.user._id, accessToken: response.accessToken };
          const authenticatedUser: AuthenticationResponseDto = { user, accessToken: response.accessToken, id: response.user._id };
          console.log('authenticatedUser:', authenticatedUser);
         // authStore.update(addEntities([authenticatedUser]));
        },
        error: () => {
          this.dialog.open(AlertDialogComponent, {
            data: { message: 'Veuillez vérifier vos identifiants et réessayer.' }
          });
        }
      }),
      catchError(error => {
        this.dialog.open(AlertDialogComponent, {
          data: { message: 'Erreur de connexion. Veuillez réessayer.' }
        });
        return throwError(() => error);
      })
    );
  }

  logout() {
    authStore.reset();
  }


}
