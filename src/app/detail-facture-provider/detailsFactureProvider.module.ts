import {CUSTOM_ELEMENTS_SCHEMA, NgModule,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import { DetailFactureProviderPageroute } from "./detailsFactureProvider.routing";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import { DetailFactureProviderComponent } from "./detail-facture-provider.component";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import {DetailFactureProviderService} from "./detail-facture-provider.service";
import {JwtInterceptor} from "../jwt-interceptor";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(DetailFactureProviderPageroute),
        SharedModule,
        NgxPaginationModule
    ],
    declarations: [DetailFactureProviderComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

        DetailFactureProviderService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class DetailsFactureProviderModule {}