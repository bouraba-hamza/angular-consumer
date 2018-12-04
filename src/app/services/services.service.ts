import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Produits} from "./Produits";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";


@Injectable()
export class ServicesService {
    private ApiUrl = 'http://localhost:8000/api/produits';  // URL to web api
    private row:any;
    private _options: RequestOptions = null;

    constructor(private http:HttpClient) {

    }

  preparHeader() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return httpOptions;
  }

    getProduits (): Observable<Produits[]> {
      const httpOptions = this.preparHeader();


      const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});

        return this.http.get<Produits[]>(this.ApiUrl+"/service",httpOptions);

    }


    addProduct (produit: Produits): Observable<Produits> {
      const httpOptions = this.preparHeader();

        return this.http.post<Produits>(this.ApiUrl+'/add', produit,httpOptions).pipe(
            tap((produit: Produits) => this.log(`added Produit w/ id=${produit.id}`)),
            catchError(this.handleError<Produits>('addProduit'))
        );



    }

    deleteProduit (produit:Produits | number) : Observable<Produits> {
      const httpOptions = this.preparHeader();

      const id = typeof produit === 'number' ? produit : produit.id;
        const url = `${this.ApiUrl}/del/${id}`;

        return this.http.delete<Produits>(url,httpOptions).pipe(
            tap((produit: Produits) => this.log(`deleted Produit w/ id=${produit.id}`)),
            catchError(this.handleError<Produits>('deletedProduit'))
        );
    }


    updateProduit (produit: Produits): Observable<Produits> {
      const httpOptions = this.preparHeader();


      return this.http.post<Produits>(this.ApiUrl+'/update', produit,httpOptions).pipe(
            tap((produit: Produits) => this.log(`update Produit w/ id=${produit.id}`)),
            catchError(this.handleError<Produits>('updateProduit'))
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
