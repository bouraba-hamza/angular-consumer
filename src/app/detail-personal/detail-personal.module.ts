import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import {DetailPersonalPageroute} from "../detail-personal/detail-personal.routing";
import {SharedModule} from "../shared/shared.module";
import {AgGridModule} from "ag-grid-angular";
import {RouterModule} from "@angular/router";
// import {CardComponent} from "../shared/card/card.component";
import {DetailPersonalComponent} from "./detail-personal.component";
import {DetailPersonalService} from "./detail-personal.service";
import {JwtInterceptor} from "../jwt-interceptor";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(DetailPersonalPageroute),
    SharedModule,
    NgxPaginationModule
  ],
  declarations: [DetailPersonalComponent ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

      DetailPersonalService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: [ ]
})
export class DetailPersonalModule { }
