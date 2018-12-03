import { Injectable } from '@angular/core';
import {Produits} from "../produits/Produits";
import {commandes} from "./commandes";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {Headers, RequestOptions} from "@angular/http";
import {catchError, tap} from "rxjs/operators";
import {products} from "./products";
import {plan} from "./plan";

@Injectable()
export class CommandesService {

  private ApiUrl = 'http://127.0.0.1:8000/api/commandes';  // URL to web api

  private ApiUrlPlan = 'http://127.0.0.1:8000/api/plan';  // URL to web api


  private ApiUrlProvider = 'http://127.0.0.1:8000/api/provider';

    private ApiUrlProduct = 'http://127.0.0.1:8000/api/products';  // URL to web api
    private _options: RequestOptions = null;
    private ess1:any;

  constructor(private http : HttpClient) { }


     addCommande (comande: commandes): Observable<any> {


        return this.http.post<commandes>(this.ApiUrl+'/add', comande).pipe(
            tap((comande: commandes) => this.log(`added Commande w/ id=${comande.id}`)),
            catchError(this.handleError<commandes>('addCommande'))
        );



    }

    addProduct (product: products): Observable<any> {

        return this.http.post<products>(this.ApiUrlProduct+'/add', product).pipe(
            tap((product: products) => this.log(`added product w/ id=${product.id}`)),
            catchError(this.handleError<products>('addProduct'))
        );


    }

    addproductOnUpdate(product: products): Observable<any> {

        return this.http.post<products>(this.ApiUrlProduct+'/addOnUpdate', product).pipe(
            tap((product: products) => this.log(`added product w/ id=${product.id}`)),
            catchError(this.handleError<products>('addProduct'))
        );
    }

    addNewPlan (plan: plan): Observable<any> {


        return this.http.post<products>(this.ApiUrlPlan+'/addPlan', plan).pipe(
            tap((plan: products) => this.log(`added plan w/ id=${plan.id}`)),
            catchError(this.handleError<products>('addPlan'))
        );


    }

    getPlan(id)
    {

        return this.http.get<any>(this.ApiUrlPlan+'/'+id);

    }

    getProviderByCategorie(id)
    {

        return this.http.get<any>(this.ApiUrlProvider+'/'+id);

    }




    // getboitier(id)
    // {
    //
    //     return this.http.get<any>(this.ApiUrlPlan,{});
    // }

    getcommande (): Observable<commandes[]>
   {

        return this.http.get<commandes[]>(this.ApiUrl);
   }

     updateCommande (commandeUpdate: commandes): Observable<commandes> {

         return this.http.post<commandes>(this.ApiUrl+'/update', commandeUpdate).pipe(
             tap((commandeUpdate: commandes) => this.log(`update commandes w/ id=${commandeUpdate.id}`)),
             catchError(this.handleError<commandes>('updateCommandes'))
         );
     }

    deleteCommande (commande:commandes ) : Observable<commandes> {

      const id = typeof commande === 'number' ? commande : commande.id;
        const url = `${this.ApiUrl}/del/${id}`;

        return this.http.delete<commandes>(url).pipe(
            tap((produit: commandes) => this.log(`deleted commande w/ id=${commande.id}`)),
            catchError(this.handleError<commandes>('deletedCommande'))
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
