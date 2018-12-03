import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Installer} from "./Installer";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";

@Injectable()
export class InstallerService {

  private ApiUrl = 'http://localhost:8000/api/instalateur/';  // URL to web api

  private _options: RequestOptions = null;

  constructor(private http:HttpClient) {

  }

  getInstaller (): Observable<Installer[]> {

        return this.http.get<Installer[]>(this.ApiUrl);

    }
}
