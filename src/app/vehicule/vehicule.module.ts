import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {ProviderPageroute} from "../provider/provider.routing";
import {AgGridModule} from "ag-grid-angular";
import {NgxPaginationModule} from "ngx-pagination";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { VehiculeService } from "./vehicule.service";
import { VehiculePageroute } from "./vehicule.routing";
import { VehiculeComponent } from "./vehicule.component";
import {JwtInterceptor} from "../jwt-interceptor";

@NgModule({
  imports: [
      CommonModule,
      HttpClientModule,
      AgGridModule.withComponents([]),
      RouterModule.forChild(VehiculePageroute),
      SharedModule,
      NgxPaginationModule
  ],
    declarations: [VehiculeComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

        VehiculeService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA],

})
export class VehiculeModule { }
