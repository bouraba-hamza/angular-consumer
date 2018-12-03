import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {commandes} from "../../commandes/commandes";
import {Observable} from "rxjs/Observable";
import {Headers, RequestOptions} from "@angular/http";
import {products} from "../../commandes/products";
import {CommandesComponent} from "../../commandes/commandes.component";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {Provider} from "../../provider/Provider";


@Injectable()
export class ProductsService {
    private ApiUrlProduct = 'http://127.0.0.1:8000/api/products';
    private _options: RequestOptions = null;
    private ApiUrlPlan = 'http://127.0.0.1:8000/api/plan';
    private ApiUrlCommande = 'http://127.0.0.1:8000/api/commandesDisticnt';

    constructor(private http:HttpClient ) { }


    getproductBoitier (): Observable<products[]>
    {

        return this.http.get<products[]>('http://127.0.0.1:8000/api/productsBoitier/');

    }

    getCommande(id): Observable<commandes[]> {

        return this.http.get<commandes[]>(this.ApiUrlCommande+'/'+id);
    }

    getProductInstallerSim(id):Observable<any> {

      return this.http.get<any>('http://127.0.0.1:8000/api/productInstallSim/'+id);
    }

    getProductStockSim(id):Observable<any> {

      return this.http.get<any>('http://127.0.0.1:8000/api/ProductStockSim/'+id);
    }
    getProductStockBoitier(id):Observable<any> {

      return this.http.get<any>('http://127.0.0.1:8000/api/ProductStockBoitier/'+id);
    }

    getProductInstallerBoitier(id):Observable<any> {

      return this.http.get<any>('http://127.0.0.1:8000/api/productInstallBoitier/'+id);
    }

    getproductSim (): Observable<products[]>
    {
        return this.http.get<products[]>('http://127.0.0.1:8000/api/productsSim/');

    }

    getPlan(id)
    {

        return this.http.get<any>(this.ApiUrlPlan+'/'+id);

    }



    addSimBoitier (product: products): Observable<any> {

        return this.http.post<products>(this.ApiUrlProduct + '/addSimBoitier', product).pipe(
            tap((product: products) => this.log(`added product w/ id=${product.id}`)),
            catchError(this.handleError<products>('addProduct'))
        );
    }

    updateProduct (productUpdate: products): Observable<products> {

        return this.http.post<products>(this.ApiUrlProduct+'/update', productUpdate).pipe(
            tap((productUpdate: products) => this.log(`update products w/ id=${productUpdate.id}`)),
            catchError(this.handleError<products>('updateProducts'))
        );

    }

    deleteProduct (product:products ) : Observable<products> {

      console.log(product);
        const id = typeof product === 'number' ? product : product.id;
        const url = `${this.ApiUrlProduct}/del/${id}`;

        return this.http.delete<products>(url).pipe(
            tap((produit: products) => this.log(`deleted commande w/ id=${product.id}`)),
            catchError(this.handleError<products>('deletedCommande'))
        );
    }

    affecter(product:products ):Observable<products> {

        return this.http.post<products>(this.ApiUrlProduct+'/affect', product).pipe(
            tap((product: products) => this.log(`update commandes w/ id=${product.id}`)),
            catchError(this.handleError<products>('updateProducts'))
        );


    }

    bloquer (product:products ):Observable<products> {

        return this.http.post<products>(this.ApiUrlProduct+'/blocage', product).pipe(
            tap((product: products) => this.log(`update commandes w/ id=${product.id}`)),
            catchError(this.handleError<products>('updateProducts'))
        );


    }

    debloquer (product:products ):Observable<products> {

        return this.http.post<products>(this.ApiUrlProduct+'/deblocage', product).pipe(
            tap((product: products) => this.log(`update commandes w/ id=${product.id}`)),
            catchError(this.handleError<products>('updateProducts'))
        );

    }

    activer(product:products ):Observable<products> {

        return this.http.post<products>(this.ApiUrlProduct+'/active', product).pipe(
            tap((product: products) => this.log(`update products w/ id=${product.id}`)),
            catchError(this.handleError<products>('updateProducts'))
        );

    }
    liberer(product:products ):Observable<products> {

        return this.http.post<products>(this.ApiUrlProduct+'/liberation', product).pipe(
            tap((product: products) => this.log(`update products w/ id=${product.id}`)),
            catchError(this.handleError<products>('updateProducts'))
        );


    }

    tranferer (product:products ):Observable<products> {

        return this.http.post<products>(this.ApiUrlProduct+'/transfert', product).pipe(
            tap((product: products) => this.log(`update commandes w/ id=${product.id}`)),
            catchError(this.handleError<products>('updateProducts'))
        );


    }
    retourner (product:products ):Observable<products> {

        return this.http.post<products>(this.ApiUrlProduct+'/retour', product).pipe(
            tap((product: products) => this.log(`update commandes w/ id=${product.id}`)),
            catchError(this.handleError<products>('updateProducts'))
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
