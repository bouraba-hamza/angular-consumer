import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA,} from '@angular/core';

import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import { UtilisateurPageroute } from "../utilisateur/utilisateur.routing";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {UtilisateurComponent} from "./utilisateur.component";
import {UtilisateurService} from "./utilisateur.service";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import { NumberOnlyDirective } from './number.directive';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import {JwtInterceptor} from "../jwt-interceptor";
import {ErrorInterceptor} from "../error-interceptor";



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(UtilisateurPageroute),
    SharedModule,
    NgxPaginationModule,
    NgxPasswordToggleModule

  ],
  declarations: [UtilisateurComponent, NumberOnlyDirective],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

      UtilisateurService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA],
  exports: []
})

export class UtilisateurModule {}
