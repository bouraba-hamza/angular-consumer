import {CUSTOM_ELEMENTS_SCHEMA, NgModule,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import { ProduitsPageroute } from "../produits/produit.routing";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {ProduitsComponent} from "./produits.component";
import {ProduitService} from "./produits.service";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import {JwtInterceptor} from "../jwt-interceptor";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(ProduitsPageroute),
    SharedModule,
    NgxPaginationModule
  ],
  declarations: [ProduitsComponent],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

      ProduitService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports: []
})

export class ProduitsModule {}
