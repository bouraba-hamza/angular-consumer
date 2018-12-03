import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {TypesUtilisateur} from "./TypesUtilisateur";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class TypesutilisateurService {
  private ApiUrl = 'http://localhost:8000/api/TypesUtilisateur';  // URL to web api
  private row:any;
  private _options: RequestOptions = null;

  constructor(private http:HttpClient) {

  }



  getTypesUtilisateur (): Observable<TypesUtilisateur[]> {



    return this.http.get<TypesUtilisateur[]>(this.ApiUrl);

  }


  addTypesUtilisateur (typesUtilisateur: TypesUtilisateur): Observable<TypesUtilisateur> {

    return this.http.post<TypesUtilisateur>(this.ApiUrl+'/add', typesUtilisateur).pipe(
      tap((typesUtilisateur: TypesUtilisateur) => this.log(`added TypesUtilisateur w/ id=${typesUtilisateur.id}`)),
      catchError(this.handleError<TypesUtilisateur>('addTypesUtilisateur'))
    );



  }

  deleteTypesUtilisateur (typesUtilisateur:TypesUtilisateur | number) : Observable<TypesUtilisateur> {
    const id = typeof typesUtilisateur === 'number' ? typesUtilisateur : typesUtilisateur.id;
    const url = `${this.ApiUrl}/del/${id}`;

    return this.http.delete<TypesUtilisateur>(url).pipe(
      tap((typesUtilisateur: TypesUtilisateur) => this.log(`deleted TypesUtilisateur w/ id=${typesUtilisateur.id}`)),
      catchError(this.handleError<TypesUtilisateur>('deletedTypesUtilisateur'))
    );
  }


  updateTypesUtilisateur (typesUtilisateur: TypesUtilisateur): Observable<TypesUtilisateur> {

    return this.http.post<TypesUtilisateur>(this.ApiUrl+'/update', typesUtilisateur).pipe(
      tap((typesUtilisateur: TypesUtilisateur) => this.log(`update TypesUtilisateur w/ id=${typesUtilisateur.id}`)),
      catchError(this.handleError<TypesUtilisateur>('updateTypesUtilisateur'))
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
