import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable} from "rxjs";
import {getState} from "../../auth/state/auth.store";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const state = getState();

    if (
      state &&
      state.authorizationHeader &&
      !request.headers.has('Authorization')
    ) {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${state.authorizationHeader}`);
      request = request.clone({ headers });
    }

    return next.handle(request).pipe(

    );
  }
}
