import {CUSTOM_ELEMENTS_SCHEMA, NgModule,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {ImportProductComponent} from "./import-product.component";

import {ImportationService} from "./importation.service";
//import {CardComponent} from "../shared/card/card.component";
import { NgxPaginationModule } from 'ngx-pagination';
import {CommandePageRoute} from "./commande.routing";
import {JwtInterceptor} from "../jwt-interceptor";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule.forChild(CommandePageRoute),
        SharedModule,
        NgxPaginationModule
    ],
    declarations: [ImportProductComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

        ImportationService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    exports: []
})

export class CommandeModule {}
