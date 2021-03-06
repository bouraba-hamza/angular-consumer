import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Factures} from "./Factures";
import {LigneFacture} from "./LigneFacture";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";


@Injectable()
export class FactureProviderService {

    private ApiUrl = 'http://192.168.3.111:8000/api/FactureProvider';  // URL to web api
    private ApiUrl1 = 'http://192.168.3.111:8000/api/LigneFacture';  // URL to web api
    private row:any;
    private _options: RequestOptions = null;

    constructor(private http:HttpClient) {

    }


    getFactures (): Observable<Factures[]> {



        return this.http.get<Factures[]>(this.ApiUrl);

    }


    addFacture (factures: Factures): Observable<Factures> {

      console.log("test"+factures);
        return this.http.post<Factures>(this.ApiUrl+'/add', factures).pipe(
            tap((facture: Factures) => this.log(`added facture w/ id=${facture.id}`)),
            catchError(this.handleError<Factures>('addFacture'))
        );

    }

    deleteFacture (factures:Factures | number) : Observable<Factures> {

      const id = typeof factures === 'number' ? factures : factures.id;
        const url = `${this.ApiUrl}/del/${id}`;

        return this.http.delete<Factures>(url).pipe(
            tap((facture: Factures) => this.log(`deleted Facture w/ id=${facture.id}`)),
            catchError(this.handleError<Factures>('deleted Facture'))
        );
    }


    updateFacture(factures: Factures): Observable<Factures> {

        return this.http.post<Factures>(this.ApiUrl+'/update', factures).pipe(
            tap((facture: Factures) => this.log(`update Factures w/ id=${facture.id}`)),
            catchError(this.handleError<Factures>('updateFactures'))
        );

    }


    getLignesFacture (id:number): Observable<LigneFacture[]> {

        const url = `${this.ApiUrl1}/${id}`;

        return this.http.get<LigneFacture[]>(url);
    }



    addLignesFacture (lignefacture: LigneFacture): Observable<LigneFacture> {

        return this.http.post<LigneFacture>(this.ApiUrl1+'/add', lignefacture).pipe(
            tap((lignefacture: LigneFacture) => this.log(`added lignefacture w/ id=${lignefacture.id}`)),
            catchError(this.handleError<LigneFacture>('addLigneFacture'))
        );

    }

    calculefacture (id:number):Observable<LigneFacture[]>{

        return this.http.get<LigneFacture[]>(this.ApiUrl+'/calcule/'+id);
    }

    deleteLignesFacture  (lignefacture:LigneFacture | number) : Observable<LigneFacture> {

      const id = typeof lignefacture === 'number' ? lignefacture : lignefacture.id;
        const url = `${this.ApiUrl1}/del/${id}`;

        return this.http.delete<LigneFacture>(url).pipe(
            tap((lignefacture: LigneFacture) => this.log(`deleted lignefacture w/ id=${lignefacture.id}`)),
            catchError(this.handleError<LigneFacture>('deleted lignefacture'))
        );
    }




    getallProduit(): Observable<LigneFacture[]> {


        return this.http.get<LigneFacture[]>("http://192.168.3.111:8000/api/produits/");
    }


    getallProvider(): Observable<LigneFacture[]> {


        return this.http.get<LigneFacture[]>("http://192.168.3.111:8000/api/provider");
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
