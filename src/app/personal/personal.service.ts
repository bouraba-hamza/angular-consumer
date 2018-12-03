import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Personal } from "./Personal";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators"
import {Utilisateur} from "../utilisateur/Utilisateur";


@Injectable()
export class PersonalService {

  private ApiUrl = 'http://192.168.3.111:8000/api/personals';  // URL to web api
  private ApiUrlUtilisateur = 'http://192.168.3.111:8000/api/utilisateur';
  private row:any;
  private _options: RequestOptions = null;

  constructor(private http:HttpClient) {

  }


  getInstallateur (): Observable<Personal[]> {


    return this.http.get<Personal[]>(this.ApiUrl);

  }

  getinterventionIncomplete(id) : Observable<number>{

    const url = `${this.ApiUrl}/${id}`;

    return this.http.get<number>(url);

  }

  getUtilisateur (): Observable<Utilisateur[]> {

    return this.http.get<Utilisateur[]>(this.ApiUrlUtilisateur);

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

