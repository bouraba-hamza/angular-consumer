import {TypesProviderPageRoute} from "./typesprovider.routing";
import {AgGridModule} from "ag-grid-angular";
//import {CardComponent} from "../shared/card/card.component";
import { NgxPaginationModule } from 'ngx-pagination';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import {TypesproviderComponent} from "./typesprovider.component";
import {TypesproviderService} from "./typesprovider.service";
import {JwtInterceptor} from "../jwt-interceptor";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(TypesProviderPageRoute),
    SharedModule,
    NgxPaginationModule

  ],
  declarations: [TypesproviderComponent ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

      TypesproviderService
  ],
})
export class TypesproviderModule { }
