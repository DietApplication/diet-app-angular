import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SurveyStorageService } from './survey-login/survey-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSurveyGuard implements CanActivate {
  constructor(public service: SurveyStorageService, public router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.service.hasEmail) {
      return true;
    } else {
      this.router.navigate(['/auth/accessSurvey']);
      return false;
    }
  }

}
