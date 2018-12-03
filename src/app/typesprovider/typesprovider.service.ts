import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {TypesProvider} from "./TypesProvider";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class TypesproviderService {
  private ApiUrl = 'http://localhost:8000/api/TypesProvider';  // URL to web api
  private row:any;
  private _options: RequestOptions = null;

  constructor(private http:HttpClient) {

  }


  getTypesProvider (): Observable<TypesProvider[]> {

    return this.http.get<TypesProvider[]>(this.ApiUrl);

  }


  addTypesProvider (typesProvider: TypesProvider): Observable<TypesProvider> {

    return this.http.post<TypesProvider>(this.ApiUrl+'/add', TypesProvider).pipe(
      tap((typesProvider: TypesProvider) => this.log(`added TypesProvider w/ id=${typesProvider.id}`)),
      catchError(this.handleError<TypesProvider>('addTypesProvider'))
    );



  }

  deleteTypesProvider (typesProvider:TypesProvider | number) : Observable<TypesProvider> {
    const id = typeof typesProvider === 'number' ? typesProvider : typesProvider.id;
    const url = `${this.ApiUrl}/del/${id}`;

    return this.http.delete<TypesProvider>(url).pipe(
      tap((typesProvider: TypesProvider) => this.log(`deleted TypesProvider w/ id=${typesProvider.id}`)),
      catchError(this.handleError<TypesProvider>('deletedTypesProvider'))
    );
  }


  updateTypesProvider (typesProvider: TypesProvider): Observable<TypesProvider> {

    return this.http.post<TypesProvider>(this.ApiUrl+'/update', TypesProvider).pipe(
      tap((typesProvider: TypesProvider) => this.log(`update TypesProvider w/ id=${typesProvider.id}`)),
      catchError(this.handleError<TypesProvider>('updateTypesProvider'))
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
