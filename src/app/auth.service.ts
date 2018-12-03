import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";

import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";

// import {AgendaService} from "./agenda/agenda.service";

@Injectable()

export class AuthService {

     private Apiurl="http://localhost:8000/api";

    constructor(private http: HttpClient,private httpdepracated:Http ) {

  }

  isLoggedIn: Boolean;

    // *ngIf="authService.isLoggedIn"


    login(email:string, pass:string) {
    return this.httpdepracated.post(this.Apiurl+'/login',
      {email: email, password: pass}
    )
    .map(
      response => {
        console.log(response.json().data.token);
        return response.json().data.token;
      })
    .do(
      (token) => {




           // set id_user and role
          let encoded_email = btoa(email);

          this.http.get<any[]>(`${this.Apiurl}/agenda/getuser_by_mail/${encoded_email}`).pipe(
              tap(_ => this.log(`Agenda events matching `)),
              catchError(this.handleError<any[]>('getuser_by_mail', []))
          ).subscribe(data => {
              let  current_user = data;
              console.log('----- getuser_by_mail [ '+email+' ]');
              console.log(data);
         //     if(data.length > 0){
                  console.log(data[0].id);
                  console.log(data[0].fonction);

                  localStorage.setItem('user_id', data[0].id);
                  localStorage.setItem('role', data[0].fonction);
          //    }
            });


          localStorage.setItem('token', token);

          this.isLoggedIn = true;



          /*
      this.http.get<any[]>(`${this.ApiUrl2}/getuser_by_mail/${email}`).pipe(
           tap(_ => this.log(`Agenda events matching `)),
           catchError(this.handleError<any[]>('getuser_by_mail', []))
       ).subscribe(data => {
          let  current_user = data;
          console.log('----- getuser_by_mail [ '+email+' ]');
          console.log(data);
          if(data.length > 0){
              console.log(data[0].id);
              console.log(data[0].fonction);

              localStorage.setItem('user_id', data[0].id);
              localStorage.setItem('role', data[0].fonction);
          }

       });
       */





      }
    )
  }

  //   headers.append('Content-Type', 'application/json; charset=utf-8');
 //   headers.append('Authorization', 'auth-token');

  checkAuth() {

    if(localStorage.getItem('token')) {
      this.isLoggedIn=true;
      return true;
    }
    return false;
  }

  logout() {

      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
          })
      };
     // return this.http.get(this.ApiUrlPdf+'/'+id,  httpOptions
      console.log(this.Apiurl + '/logout');
      console.log(localStorage.getItem('token'));
      console.log(new Headers({'Authorization': 'Bearer ' + localStorage.getItem('token')}));


      localStorage.removeItem('user_id');
      localStorage.removeItem('role');

      return this.http.get(
          this.Apiurl + '/logout',
          httpOptions
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