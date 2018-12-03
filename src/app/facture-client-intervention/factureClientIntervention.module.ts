import {CUSTOM_ELEMENTS_SCHEMA, NgModule,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import {FactureClientInterventionService} from "./facture-client-intervention.service";
import {FactureClientInterventionComponent} from "./facture-client-intervention.component";
import {FactureClientInterventionPageroute} from "./FactureClientIntervention.routing";
import {JwtInterceptor} from "../jwt-interceptor";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(FactureClientInterventionPageroute),
        SharedModule,
        NgxPaginationModule
    ],
    declarations: [FactureClientInterventionComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

        FactureClientInterventionService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class FactureClientInterventionModule {}