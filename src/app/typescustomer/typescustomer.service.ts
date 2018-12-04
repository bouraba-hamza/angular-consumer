import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {TypesCustomer} from "./TypesCustomer";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class TypescustomerService {
  private ApiUrl = 'http://192.168.3.111:8000/api/TypesCustomer';  // URL to web api

  constructor(private http:HttpClient) {

  }



  getTypesCustomer (): Observable<TypesCustomer[]> {



    return this.http.get<TypesCustomer[]>(this.ApiUrl);

  }


  // find_id_by_types_customer(label_type : string): Observable<TypesCustomer[]> {
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json; charset=utf-8');
  //   headers.append('Authorization', 'auth-token');
  //   this._options = new RequestOptions({headers: headers});
  //
  //   return this.http.get<TypesCustomer[]>(this.ApiUrl+'/find/'+label_type,{});
  //
  // }



  addTypesCustomer (typesCustomer: TypesCustomer): Observable<TypesCustomer> {

    return this.http.post<TypesCustomer>(this.ApiUrl+'/add', typesCustomer).pipe(
      tap((typesCustomer: TypesCustomer) => this.log(`added TypesCustomer w/ id=${typesCustomer.id}`)),
      catchError(this.handleError<TypesCustomer>('addTypesCustomer'))
    );



  }

  deleteTypesCustomer (typesCustomer:TypesCustomer | number) : Observable<TypesCustomer> {
    const id = typeof typesCustomer === 'number' ? typesCustomer : typesCustomer.id;
    const url = `${this.ApiUrl}/del/${id}`;

    return this.http.delete<TypesCustomer>(url).pipe(
      tap((typesCustomer: TypesCustomer) => this.log(`deleted TypesCustomer w/ id=${typesCustomer.id}`)),
      catchError(this.handleError<TypesCustomer>('deletedTypesCustomer'))
    );
  }


  updateTypesCustomer (typesCustomer: TypesCustomer): Observable<TypesCustomer> {

    return this.http.post<TypesCustomer>(this.ApiUrl+'/update', typesCustomer).pipe(
      tap((typesCustomer: TypesCustomer) => this.log(`update TypesCustomer w/ id=${typesCustomer.id}`)),
      catchError(this.handleError<TypesCustomer>('updateTypesCustomer'))
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
