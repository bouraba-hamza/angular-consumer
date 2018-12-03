import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import { SchemavehiculePageroute } from "../schemavehicule/schemavehicule.routing";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {SchemavehiculeComponent} from "./schemavehicule.component";
import {SchemavehiculeService} from "./schemavehicule.service";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import {JwtInterceptor} from "../jwt-interceptor";


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(SchemavehiculePageroute),
    SharedModule,
    NgxPaginationModule

  ],
  declarations: [SchemavehiculeComponent],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

      SchemavehiculeService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA],
  exports: []
})

export class SchemavehiculeModule {}
