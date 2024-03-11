import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {AuthService} from "../state/auth.service";
import {getState} from "../state/auth.store";

export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);
  console.log("getState().authorizationHeader",getState().authorizationHeader)
  if (!getState().authorizationHeader) {
    router.navigateByUrl('/auth')
    return false;
  }
  return true;
};
