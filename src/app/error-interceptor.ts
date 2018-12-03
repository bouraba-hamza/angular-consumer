import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {_throw} from 'rxjs/observable/throw';

import { catchError } from 'rxjs/operators';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {


                console.log('test work perfectly');
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                this.router.navigate(['login']);
            }

            const error = err.error.message || err.statusText;
            return _throw(error);
        }))
    }
}