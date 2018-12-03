import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Journalisation } from "./Journalisation";
import {HttpClient} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators"
import {Utilisateur} from "../utilisateur/Utilisateur";
import * as XLSX from 'xlsx';



@Injectable()
export class JournalisationService {

  private ApiUrl = 'http://localhost:8000/api/Journalisation';  // URL to web api
  private row:any;
  private _options: RequestOptions = null;

  constructor(private http:HttpClient) {

  }


  // journalisationAdd(journ)
  // {
  //
  //   return this.http.post<journalisation>(this.ApiUrl+'/add', journ).pipe(
  //     tap((schemavehicule: SchemaVehicule) => this.log('added Schema w/ id=${schemavehicule.id}')),
  //     catchError(this.handleError<SchemaVehicule>('addSchemaVehicule'))
  //   );
  // }

  getJournalisation (): Observable<Journalisation[]> {

    return this.http.get<Journalisation[]>(this.ApiUrl);

  }



  static toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    XLSX.writeFile(workbook, JournalisationService.toExportFileName(excelFileName));
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

