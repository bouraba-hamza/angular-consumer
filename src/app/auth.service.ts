import { Injectable } from "@angular/core";
import {  Headers } from "@angular/http";

import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";
import {products} from "./commandes/products";

// import {AgendaService} from "./agenda/agenda.service";

@Injectable()

export class AuthService {

     private Apiurl="http://192.168.3.111:8000/api";

    constructor(private http: HttpClient) {

  }

  isLoggedIn: Boolean;

    // *ngIf="authService.isLoggedIn"


    login(email:string, pass:string) {


        return this.http.post<any[]>(this.Apiurl+'/login',
            {email: email, password: pass}).pipe(
            tap(data => {

                console.log(data);

                localStorage.setItem('token', data[0].token);
                localStorage.setItem('user_id', data[0].user_id);
                localStorage.setItem('role', data[0].role);

                this.isLoggedIn = true;

            }),
            catchError(this.handleError<any>('login'))
        )
  }


  checkAuth() {

    if(localStorage.getItem('token')) {
      this.isLoggedIn=true;
      return true;
    }
    return false;
  }

  logout() {

      // const httpOptions = {
      //     headers: new HttpHeaders({
      //         'Content-Type': 'application/json',
      //         'Authorization': 'Bearer ' + localStorage.getItem('token')
      //     })
      // };
     // return this.http.get(this.ApiUrlPdf+'/'+id,  httpOptions
      console.log(this.Apiurl + '/logout');
      console.log(localStorage.getItem('token'));
      console.log(new Headers({'Authorization': 'Bearer ' + localStorage.getItem('token')}));


      localStorage.removeItem('user_id');
      localStorage.removeItem('role');

      return this.http.get(
          this.Apiurl + '/logout'
      ).pipe(
          tap((response: any) => this.log(`response=${response}`)),
          catchError(this.handleError<any>('logout'))
      );

  }
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            // console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private log(message: string) {
        console.log(message);
    }


}