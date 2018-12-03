import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {AgGridModule} from "ag-grid-angular";
import {NgxPaginationModule} from "ngx-pagination";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {JournalisationComponent} from "./journalisation.component";
import {JournalisationService} from "./journalisation.service";
import {JournalisationPageroute} from "./journalisation.routing";
import {JwtInterceptor} from "../jwt-interceptor";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(JournalisationPageroute),
    SharedModule,
    NgxPaginationModule
  ],
  declarations: [JournalisationComponent],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

      JournalisationService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA],
  exports: []
})
export class JournalisationModule { }
