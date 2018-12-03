import {CUSTOM_ELEMENTS_SCHEMA, NgModule,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import {InterventionNonFactureComponent} from "./intervention-non-facture-component";
import {InterventionNonFacturePageroute} from "./interventionNonFacture.routing";
import {InterventionNonFactureService} from "./intervention-non-facture.service";
import {JwtInterceptor} from "../jwt-interceptor";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(InterventionNonFacturePageroute),
        SharedModule,
        NgxPaginationModule
    ],
    declarations: [InterventionNonFactureComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

        InterventionNonFactureService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class InterventionNonFactureModule {}