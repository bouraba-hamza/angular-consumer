import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {SchemaVehicule} from "./SchemaVehicule";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";
import {Modele} from "../modele/Modele";
import {Marque} from "../marque/Marque";
import {HttpParams, HttpRequest, HttpEvent} from '@angular/common/http';


@Injectable()
export class SchemavehiculeService {

  private ApiUrl = 'http://localhost:8000/api/SchemaVehicule';  // URL to web api
  private ApiUrlModele = 'http://localhost:8000/api/Modele';
  private ApiUrlMarque = 'http://localhost:8000/api/Marque';
  private row:any;
  private _options: RequestOptions = null;

  constructor(private http:HttpClient) {

  }


  getModele (): Observable<Modele[]> {


    return this.http.get<Modele[]>(this.ApiUrlModele);

  }

  getMarque (): Observable<Marque[]> {


    return this.http.get<Marque[]>(this.ApiUrlMarque);

  }



  getSchemaVehicule (): Observable<SchemaVehicule[]> {



    return this.http.get<SchemaVehicule[]>(this.ApiUrl);

  }


  addSchemaVehicule (schemavehicule: SchemaVehicule): Observable<SchemaVehicule> {

    return this.http.post<SchemaVehicule>(this.ApiUrl+'/add', schemavehicule).pipe(
      tap((schemavehicule: SchemaVehicule) => this.log('added Schema w/ id=${schemavehicule.id}')),
      catchError(this.handleError<SchemaVehicule>('addSchemaVehicule'))
    );

  }


  deleteSchemaVehicule (schemavehicule:SchemaVehicule | number) : Observable<SchemaVehicule> {

    const id = typeof schemavehicule === 'number' ? schemavehicule : schemavehicule.id;
    const url = `${this.ApiUrl}/del/${id}`;

    return this.http.delete<SchemaVehicule>(url).pipe(
      tap((schemavehicule: SchemaVehicule) => this.log('deleted Schema w/ id=${schemavehicule.id}')),
      catchError(this.handleError<SchemaVehicule>('deletedSchemaVehicule'))
    );
  }


  updateSchemaVehicule (schemavehicule: SchemaVehicule): Observable<SchemaVehicule> {


    return this.http.post<SchemaVehicule>(this.ApiUrl+'/update', schemavehicule).pipe(
      tap((schemavehicule: SchemaVehicule) => this.log('update Schema w/ id=${schemavehicule.id}')),
      catchError(this.handleError<SchemaVehicule>('updateSchemaVehicule'))
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
