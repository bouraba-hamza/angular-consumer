import {CUSTOM_ELEMENTS_SCHEMA, NgModule,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import { ServicesPageroute } from "../services/service.routing";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {ServicesComponent} from "./services.component";
import {ServicesService} from "./services.service";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(ServicesPageroute),
        SharedModule,
        NgxPaginationModule
    ],
    declarations: [ServicesComponent],
    providers: [
        ServicesService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    exports: []
})

export class ServicesModule {}
