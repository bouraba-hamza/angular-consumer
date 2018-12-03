import {CUSTOM_ELEMENTS_SCHEMA, NgModule,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import {FactureClientService} from "./facture-client.service";
import {FactureClientComponent} from "./facture-client.component";
import {FactureClientPageroute} from "./FactureClient.routing";
import {JwtInterceptor} from "../jwt-interceptor";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(FactureClientPageroute),
        SharedModule,
        NgxPaginationModule
    ],
    declarations: [FactureClientComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

        FactureClientService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class FactureClientModule {}