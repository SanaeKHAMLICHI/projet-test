import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationDto, AuthenticationResponseDto, RegisterDto } from './auth.model';
import {environment} from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private readonly authBaseUrl = `${environment.apiUrl}/auth`;


  addUser(registerDto: RegisterDto): Observable<AuthenticationResponseDto> {
    return this.http.post<AuthenticationResponseDto>(`${this.authBaseUrl}/register`, registerDto)
      .pipe(catchError(this.handleError));
  }

  login(authData: AuthenticationDto): Observable<AuthenticationResponseDto> {
    return this.http.post<AuthenticationResponseDto>(`${this.authBaseUrl}/login`, authData)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Une erreur est survenue; veuillez réessayer plus tard.'));
  }
}
