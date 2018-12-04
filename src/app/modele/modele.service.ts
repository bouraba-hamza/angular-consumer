import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Modele} from "./Modele";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class ModeleService {
  private ApiUrl = 'http://localhost:8000/api/Modele';  // URL to web api
  private row:any;
  private _options: RequestOptions = null;

  constructor(private http:HttpClient) {

  }


  getModele (): Observable<Modele[]> {



    return this.http.get<Modele[]>(this.ApiUrl);

  }


  addModele (modele: Modele): Observable<Modele> {

    return this.http.post<Modele>(this.ApiUrl+'/add', modele).pipe(
      tap((modele: Modele) => this.log(`added Modele w/ id=${modele.id}`)),
      catchError(this.handleError<Modele>('addModele'))
    );



  }

  deleteModele (modele:Modele | number) : Observable<Modele> {

    const id = typeof modele === 'number' ? modele : modele.id;
    const url = `${this.ApiUrl}/del/${id}`;

    return this.http.delete<Modele>(url).pipe(
      tap((modele: Modele) => this.log(`deleted Modele w/ id=${modele.id}`)),
      catchError(this.handleError<Modele>('deletedModele'))
    );
  }


  updateModele (modele: Modele): Observable<Modele> {

    return this.http.post<Modele>(this.ApiUrl+'/update', modele).pipe(
      tap((modele: Modele) => this.log(`update Modele w/ id=${modele.id}`)),
      catchError(this.handleError<Modele>('updateModele'))
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
