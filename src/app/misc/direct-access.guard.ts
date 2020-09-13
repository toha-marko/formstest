import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { FormQuery } from '../views/form/state/form.query';

@Injectable({providedIn: 'root'})
export class DirectAccessGuard implements CanActivate {
  constructor(private formQuery: FormQuery, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const access = this.formQuery.getValue().ui.readyForRedirect;
    if (!access) {
      this.router.navigate(['form']);
    }
    return access;
  }
}
