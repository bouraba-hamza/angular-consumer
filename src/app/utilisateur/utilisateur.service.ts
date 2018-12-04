import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Utilisateur} from "./Utilisateur";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";
import {TypesUtilisateur} from "../typesutilisateur/TypesUtilisateur";


@Injectable()
export class UtilisateurService {

  private ApiUrl = 'http://localhost:8000/api/utilisateur';  // URL to web api
  private ApiUrltypesutilisateur = 'http://localhost:8000/api/TypesUtilisateur';

  private row:any;
  private _options: RequestOptions = null;

  constructor(private http:HttpClient) {

  }


  getUtilisateur (): Observable<Utilisateur[]> {


    return this.http.get<Utilisateur[]>(this.ApiUrl);

  }

  getTypesUtilisateur (): Observable<TypesUtilisateur[]> {


    return this.http.get<TypesUtilisateur[]>(this.ApiUrltypesutilisateur);

  }


  addUtilisateur (utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.ApiUrl+'/add',utilisateur).pipe(
      tap((utilisateur: Utilisateur) => this.log(`added Utilisateur w/ id=${utilisateur.id}`)),
      catchError(this.handleError<Utilisateur>('addUtilisateur'))
    );



  }


  updateUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.ApiUrl+'/update', utilisateur).pipe(
      tap((utilisateur: Utilisateur) => this.log(`update Utilisateur w/ id=${utilisateur.id}`)),
      catchError(this.handleError<Utilisateur>('updateUtilisateur'))
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
