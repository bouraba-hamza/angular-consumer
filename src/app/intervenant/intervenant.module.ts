import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AgGridModule} from "ag-grid-angular";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {NgxPaginationModule} from "ngx-pagination";
import {SharedModule} from "../shared/shared.module";
import {ProduitsComponent} from "../produits/produits.component";
import { IntervenantService } from "./intervenant.service";
import { IntervenantPageroute } from "./intervenant.routing";
import {IntervenantComponent} from "./intervenant.component";
import {JwtInterceptor} from "../jwt-interceptor";

@NgModule({
  imports: [
      CommonModule,
      HttpClientModule,
      AgGridModule.withComponents([]),
      RouterModule.forChild(IntervenantPageroute),
      SharedModule,
      NgxPaginationModule,

  ],
    declarations: [IntervenantComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

        IntervenantService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    exports: []
})
export class IntervenantModule { }
