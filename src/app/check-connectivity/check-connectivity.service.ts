import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Headers, RequestOptions} from "@angular/http";
import { CheckConnectivityComponent } from './check-connectivity.component';

@Injectable()
export class CheckConnectivityService {

    constructor() {
    }




}



