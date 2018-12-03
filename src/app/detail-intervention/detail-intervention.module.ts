import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import {Detail_interventionPageroute} from "../detail-intervention/detail-intervention.routing";
import {SharedModule} from "../shared/shared.module";
import {AgGridModule} from "ag-grid-angular";
import {RouterModule} from "@angular/router";
import {DetailInterventionService} from "./detail-intervention.service";
import {DetailInterventionComponent} from "./detail-intervention.component";
import {JwtInterceptor} from "../jwt-interceptor";

@NgModule({
  imports: [
      CommonModule,
      HttpClientModule,
      AgGridModule.withComponents([]),
      RouterModule.forChild(Detail_interventionPageroute),
      SharedModule,
      NgxPaginationModule
  ],
    declarations: [DetailInterventionComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

        DetailInterventionService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    exports: []
})
export class DetailInterventionModule { }
