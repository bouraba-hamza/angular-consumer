import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private route:Router, private authService:AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      // const expectedRole = route.data.expectedRole;
      // const token = localStorage.getItem('token');
      // // decode the token to get its payload
      // const tokenPayload = decode(token);
      //
      //
      // if (
      //     !this.auth.isAuthenticated() ||
      //     tokenPayload.role !== expectedRole
      // )

      if (!this.authService.checkAuth()) {
          this.route.navigate(['login']);
          return false;
      }
      return true;
  }
}
