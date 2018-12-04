import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { RequestOptions } from '../../../node_modules/@angular/http';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Agenda } from './Agenda';

import {Headers} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";


@Injectable()
export class AgendaService {

 
  private ApiUrl = 'http://localhost:8000/api/agenda';  // URL to web api
  private row:any;
  private _options: RequestOptions = null;

  constructor(private http:HttpClient) {

  }


    checketateventbyidevent(calEvent_id): Observable<any> {
    //    console.log('++++++++++++++ '+calEvent_id);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});
        return this.http.get<any>(this.ApiUrl+'/checketateventbyidevent/'+calEvent_id ,{});
    }
    add_datevue_calendar(calEvent_id,date_vue_encoded): Observable<any> {
        return this.http.get<any>(this.ApiUrl+'/add_datevue_calendar/'+calEvent_id+'/'+date_vue_encoded,{});
    }

    add_date_end(calEvent_id,date_end): Observable<any> {
        return this.http.get<any>(this.ApiUrl+'/add_date_end/'+calEvent_id+'/'+date_end,{});
    }
    upd_dates_start_end(calEvent_id,date_start,date_end): Observable<any> {
        return this.http.get<any>(this.ApiUrl+'/upd_dates_start_end/'+calEvent_id+'/'+date_start+'/'+date_end,{});
    }
    /*
    upd_date_end(calEvent_id,date_vue_encoded): Observable<any> {
        return this.http.get<any>(this.ApiUrl+'/add_datevue_calendar/'+calEvent_id+'/'+date_vue_encoded,{});
    }
    */

    enabletatcalendar(calEvent_id): Observable<any> {
        return this.http.get<any>(this.ApiUrl+'/enabletatcalendar/'+calEvent_id ,{});
    }

    refresh_addremove_fakeevent(intern_id): Observable<any> {
        return this.http.get<any>(this.ApiUrl+'/refresh_addremove_fakeevent/'+intern_id ,{});
    }

    getusernamebyid(id_user): Observable<any> {
        return this.http.get<any>(this.ApiUrl+'/getusernamebyid/'+id_user ,{});
    }

getUsers(): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Authorization', 'auth-token');
    this._options = new RequestOptions({headers: headers});
    return this.http.get<any>(this.ApiUrl+'/getusers',{});
  }

  getAgenda(): Observable<Agenda[]> {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Authorization', 'auth-token');
    this._options = new RequestOptions({headers: headers});

    return this.http.get<Agenda[]>(this.ApiUrl,{});

  }

  

/*
  getAgenda_interval(agenda: Agenda): Observable<Agenda[]> {
  //  return this.http.post<Agenda[]>(this.ApiUrl+'show/'+date1+'/'+date2,{});
     // return this.http.post<Agenda>(this.ApiUrl+'/show', agenda).pipe(
        return this.http.post<Agenda[]>(this.ApiUrl+'/show', agenda,{});
  }
*/
    getAgenda_by_idUser_sup(id_user : string): any {
        return this.http.get<Agenda[]>(`${this.ApiUrl}/geteventsusersup/${id_user}`).pipe(
            tap(_ => this.log(`Agenda events matching `)),
            catchError(this.handleError<Agenda[]>('getAgenda_by_idUser', []))
        );
    }

getAgenda_filter(agenda: Agenda): any {
  return this.http.get<Agenda[]>(`${this.ApiUrl}/filter/?type=${agenda.type}&title=${agenda.title}&client_id=${agenda.client_id}&installateur_id=${agenda.installateur_id}&lieu=${agenda.lieu}&date1=${agenda.created_at}&date2=${agenda.update_at}&id_user=${agenda.id_user}&role=${agenda.role}`).pipe(
   tap(_ => this.log(`Agenda events matching `)),
   catchError(this.handleError<Agenda[]>('getAgenda_byType', []))
 );
}

  getAgenda_interval(agenda: Agenda): any {
       return this.http.get<Agenda[]>(`${this.ApiUrl}/show/?created_at=${agenda.created_at}&update_at=${agenda.update_at}&id_user=${agenda.id_user}&role=${agenda.role}`).pipe(
        tap(_ => this.log(`Agenda events matching `)),
        catchError(this.handleError<Agenda[]>('getAgenda_interval', []))
      );
    }


    getAgenda_by_idUser(id_user : string): any {
      return this.http.get<Agenda[]>(`${this.ApiUrl}/geteventsuser/${id_user}`).pipe(
       tap(_ => this.log(`Agenda events matching `)),
       catchError(this.handleError<Agenda[]>('getAgenda_by_idUser', []))
     );
   }




    get_created_at_byidevent(id_event : number): any {
        return this.http.get<any[]>(`${this.ApiUrl}/get_created_at_byidevent/${id_event}`).pipe(
            tap(_ => this.log(`Agenda events matching `)),
            catchError(this.handleError<any[]>('get_created_at_byidevent', []))
        );
    }


  addAgenda(agenda: Agenda): Observable<Agenda> {
      console.log('--- created_at ---- ---------------> ');


    let  currentdate = new Date();
      let  datetime = currentdate.getDate() + "/"
          + (currentdate.getMonth()+1)  + "/"
          + currentdate.getFullYear() + "@"
          + currentdate.getHours() + ":"
          + currentdate.getMinutes() + ":"
          + currentdate.getSeconds();


    agenda.created_at = datetime;
      console.log(agenda);

    return this.http.post<Agenda>(this.ApiUrl+'/add', agenda).pipe(
      tap((agenda: Agenda) => this.log(`added Agenda w/ id=${agenda.id}`)),
      catchError(this.handleError<Agenda>('addAgenda'))
    );

  }

  deleteAgenda(agenda:Agenda | number) : Observable<Agenda> {
    const id = typeof agenda === 'number' ? agenda : agenda.id;
    const url = `${this.ApiUrl}/del/${id}`;

    return this.http.delete<Agenda>(url).pipe(
      tap((agenda: Agenda) => this.log(`deleted Agenda w/ id=${agenda.id}`)),
      catchError(this.handleError<Agenda>('deletedAgenda'))
    );
  }


  updateAgenda(agenda: Agenda): Observable<Agenda> {

    return this.http.post<Agenda>(this.ApiUrl+'/update', agenda).pipe(
      tap((agenda: Agenda) => this.log(`update Agenda w/ id=${agenda.id}`)),
      catchError(this.handleError<Agenda>('updateAgenda'))
    );

  }



    getuser_by_mail(mail : string): any {
        return this.http.get<any[]>(`${this.ApiUrl}/getuser_by_mail/${mail}`).pipe(
            tap(_ => this.log(`Agenda events matching `)),
            catchError(this.handleError<any[]>('getuser_by_mail', []))
        );
    }


    getCountRowsAgenda_by_idUser(id_user : string): any {
        return this.http.get<Agenda[]>(`${this.ApiUrl}/getcountrowseventsuser/${id_user}`).pipe(
            //   tap(_ => this.log(`Agenda events matching `)),
            //  catchError(this.handleError<Agenda[]>('getAgenda_by_idUser', []))
        );
    }



    get_count_event_non_vue_by_id_installateur(id_installateur : string): any {
        return this.http.get<Agenda[]>(`${this.ApiUrl}/get_count_event_non_vue_by_id_installateur/${id_installateur}`).pipe(
            //   tap(_ => this.log(`Agenda events matching `)),
            //  catchError(this.handleError<Agenda[]>('getAgenda_by_idUser', []))
        );
    }


    get_count_all_events_non_vues(): any {
        return this.http.get<Agenda[]>(`${this.ApiUrl}/get_count_all_events_non_vues/`).pipe(
            //   tap(_ => this.log(`Agenda events matching `)),
            //  catchError(this.handleError<Agenda[]>('getAgenda_by_idUser', []))
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
   // console.log(message);
  }



}
