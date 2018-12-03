import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";
import {HttpParams, HttpRequest, HttpEvent} from '@angular/common/http';
import {DetailPersonal} from "./DetailPersonal";


@Injectable()
export class DetailPersonalService {

  private ApiUrl = 'http://localhost:8000/api/Personaldetail';  // URL to web api

  constructor(private http:HttpClient) {

  }



  getDetailPersonal(): Observable<DetailPersonal[]> {


    return this.http.get<DetailPersonal[]>(this.ApiUrl);

  }

  getDetail (detailPersonal: DetailPersonal): Observable<DetailPersonal> {

    return this.http.post<DetailPersonal>(this.ApiUrl+'/detail', detailPersonal).pipe(
      tap((detailPersonal: DetailPersonal) => this.log(`get Detail w/ id=${detailPersonal.id}`)),
      catchError(this.handleError<DetailPersonal>('getDetail'))
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
