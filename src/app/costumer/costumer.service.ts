import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Costumer} from "./Costumer";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";
import {TypesCustomer} from "../typescustomer/TypesCustomer";
import {Utilisateur} from "../utilisateur/Utilisateur";

@Injectable()
export class CostumerService {

  private ApiUrl = 'http://192.168.3.111:8000/api/costumer';  // URL to web api
  private ApiUrltypescustomer = 'http://192.168.3.111:8000/api/TypesCustomer';
  private ApiUrlutilisateur = 'http://192.168.3.111:8000/api/utilisateur';

  private row:any;
  private _options: RequestOptions = null;

  constructor(private http:HttpClient) {

  }



  getCostumer (): Observable<Costumer[]> {


    return this.http.get<Costumer[]>(this.ApiUrl);

  }

  getTypesCustomer (): Observable<TypesCustomer[]> {


    return this.http.get<TypesCustomer[]>(this.ApiUrltypescustomer);

  }


  getUtilisateur(): Observable<Utilisateur[]> {


    return this.http.get<Utilisateur[]>(this.ApiUrlutilisateur);

  }


  addCostumer (costumer: Costumer): Observable<Costumer> {

    return this.http.post<Costumer>(this.ApiUrl+'/add', costumer).pipe(
      tap((costumer: Costumer) => this.log(`added Customer w/ id=${costumer.id}`)),
      catchError(this.handleError<Costumer>('addCostumer'))
    );



  }

  deleteCostumer (costumer:Costumer | number) : Observable<Costumer> {



    const id = typeof costumer === 'number' ? costumer : costumer.id;
    console.log(id);
    const url = `${this.ApiUrl}/del/${id}`;

    return this.http.delete<Costumer>(url).pipe(
      tap((costumer: Costumer) => this.log(`deleted Costumer w/ id=${costumer.id}`)),
      catchError(this.handleError<Costumer>('deletedCostumer'))
    );
  }


  updateCostumer (costumer: Costumer): Observable<Costumer> {

    return this.http.post<Costumer>(this.ApiUrl+'/update', costumer).pipe(
      tap((costumer: Costumer) => this.log(`update Costumer w/ id=${costumer.id}`)),
      catchError(this.handleError<Costumer>('updateCostumer'))
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
