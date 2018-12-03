import {CUSTOM_ELEMENTS_SCHEMA, NgModule,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import {ReglementClientComponent} from "./reglement-client.component";
import {ReglementClientPageroute} from "./ReglementClient.routing";
import {ReglementClientService} from "./reglement-client.service";
import {JwtInterceptor} from "../jwt-interceptor";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(ReglementClientPageroute),
        SharedModule,
        NgxPaginationModule
    ],
    declarations: [ReglementClientComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

        ReglementClientService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ReglementClientModule {}