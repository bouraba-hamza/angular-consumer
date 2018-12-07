import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {



    constructor(private router: Router) {

    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(request.url);

        let role ;
        let currentUser ;


        currentUser = localStorage.getItem('token');
        role =localStorage.getItem('role');



        if (currentUser) {
            if (role) {

                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser}`,
                        rl: role,
                        md:  this.router.url,
                        rt:  request.url
                    }
                });

            }

        }



        return next.handle(request);



}


}






