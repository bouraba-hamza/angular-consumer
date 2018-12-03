import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Marque} from "./Marque";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class MarqueService {
  private ApiUrl = 'http://192.168.3.111:8000/api/Marque';  // URL to web api
  private row:any;
  private _options: RequestOptions = null;

  constructor(private http:HttpClient) {

  }



  getMarque(): Observable<Marque[]> {


    return this.http.get<Marque[]>(this.ApiUrl);

  }


  addMarque (marque: Marque): Observable<Marque> {

    return this.http.post<Marque>(this.ApiUrl+'/add', marque).pipe(
      tap((marque: Marque) => this.log(`added Marque w/ id=${marque.id}`)),
      catchError(this.handleError<Marque>('addMarque'))
    );



  }

  deleteMarque (marque:Marque | number) : Observable<Marque> {

    const id = typeof marque === 'number' ? marque : marque.id;
    const url = `${this.ApiUrl}/del/${id}`;

    return this.http.delete<Marque>(url).pipe(
      tap((marque: Marque) => this.log(`deleted Marque w/ id=${marque.id}`)),
      catchError(this.handleError<Marque>('deletedMarque'))
    );
  }


  updateMarque (marque: Marque): Observable<Marque> {

    return this.http.post<Marque>(this.ApiUrl+'/update', marque).pipe(
      tap((marque: Marque) => this.log(`update Marque w/ id=${marque.id}`)),
      catchError(this.handleError<Marque>('updateMarque'))
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
