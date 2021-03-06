import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {Factures} from "../facture-provider/Factures";
import {Observable} from "rxjs/Observable";
import {LigneFacture} from "../facture-client/LigneFacture";
import {ReglementProvider} from "./ReglementClient";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {ReglementClient} from "../reglement-client/ReglementClient";

@Injectable()
export class DetailFactureClientService {

    private ApiUrl = 'http://192.168.3.111:8000/api/FactureClient';  // URL to web api
    private ApiUrl1 = 'http://192.168.3.111:8000/api/LigneFactureClient';  // URL to web api
    private ApiUrl2 = 'http://192.168.3.111:8000/api/ReglementClient';  // URL to web api
    private row:any;
    private _options: RequestOptions = null;

    constructor(private http:HttpClient) {

    }


    getFactureInfo (id:number): Observable<Factures[]> {


        return this.http.get<Factures[]>(this.ApiUrl+"/"+id);

    }


    getAllBanque(): Observable<LigneFacture[]> {


        return this.http.get<LigneFacture[]>("http://192.168.3.111:8000/api/banque/");
    }



    getLignesFacture (id:number): Observable<LigneFacture[]> {

        const url = `${this.ApiUrl1}/${id}`;

        return this.http.get<LigneFacture[]>(url);
    }

    getReglementFacture (id:number): Observable<ReglementProvider[]> {

        const url = `${this.ApiUrl2}/${id}`;
        return this.http.get<ReglementProvider[]>(url);
    }

    addReglement(reglement: ReglementProvider): Observable<ReglementProvider> {


        return this.http.post<ReglementProvider>(this.ApiUrl2+'/add', reglement).pipe(
            tap((reglement: ReglementProvider) => this.log(`added reglement w/ id=${reglement.id}`)),
            catchError(this.handleError<Factures>('addReglement'))
        );

    }


    deleteReg(reglement:ReglementClient | number) : Observable<LigneFacture> {

      const id = typeof reglement === 'number' ? reglement : reglement.id;
        const url = `${this.ApiUrl2}/del/${id}`;

        return this.http.delete<ReglementClient>(url).pipe(
            tap((reglement: ReglementClient) => this.log(`deleted lignefacture w/ id=${reglement.id}`)),
            catchError(this.handleError<ReglementClient>('deleted lignefacture'))
        );
    }



    calculereglement (id:number):Observable<Factures[]>{

        return this.http.get<Factures[]>(this.ApiUrl2+'/calcule/'+id);
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
