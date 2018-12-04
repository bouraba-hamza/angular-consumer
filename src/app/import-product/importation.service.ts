import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {catchError, tap} from "rxjs/operators";
import {ProductImport} from "./ProductImport";
import {Movement} from "./Movement";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {of} from "rxjs/observable/of";
import {Headers, RequestOptions} from "@angular/http";


@Injectable()
export class ImportationService {

  private ApiUrl = 'http://192.168.3.111:8000/api/movements';  // URL to web api
  private ApiUrlProduct = 'http://192.168.3.111:8000/api/products';  // URL to web api
  private ApiUrlprovider = 'http://192.168.3.111:8000/api/provider';  // URL to web api
  private ApiUrlcategorie = 'http://192.168.3.111:8000/api/categorie';  // URL to web api

  constructor(private http: HttpClient) { }




  getMovement (): Observable<Movement[]> {



    return this.http.get<Movement[]>(this.ApiUrl);

  }

    getProvider (): Observable<any> {



        return this.http.get<any>(this.ApiUrlprovider);

    }

    getcategorie (): Observable<any> {

        return this.http.get<any>(this.ApiUrlcategorie);

    }



  addMovement(Movem :Movement) {

    return this.http.post<Movement>(this.ApiUrl+'/add', Movem).pipe(
      tap((Movem: Movement) => this.log(`added movement w/ id=${Movem.id}`)),
      catchError(this.handleError<Movement>('addmovement'))
    );

  }

  addProduct (Product: any): Observable<any> {

    return this.http.post<any>(this.ApiUrlProduct +'/add', Product).pipe(
      tap((Product: any) => this.log(`added Produit w/ id=${Product.id}`)),
      catchError(this.handleError<any>('addProduit'))
    );

  }

    deleteCommande (Commande:Movement | number) : Observable<Movement> {

      const id = typeof Commande === 'number' ? Commande : Commande.id;
        const url = `${this.ApiUrl}/del/${id}`;

        return this.http.delete<Movement>(url).pipe(
            tap((Commande: Movement) => this.log(`deleted Produit w/ id=${Commande.id}`)),
            catchError(this.handleError<Movement>('deletedCommande'))
        );
    }


    updateCommande (commande: Movement): Observable<Movement> {

        return this.http.post<Movement>(this.ApiUrl+'/update', commande).pipe(
            tap((produit: Movement) => this.log(`update Produit w/ id=${commande.id}`)),
            catchError(this.handleError<Movement>('updateProduit'))
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
