import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageroute } from "../products/products.routing";
import {HttpClientModule} from "@angular/common/http";

//import { ProductsRouting } from './products.routing';
import { ProductsComponent } from './boitier/products.component';
import {FormsModule} from '@angular/forms';
import { HttpModule }    from '@angular/http';

import {RouterModule} from "@angular/router";
import {ProductsService} from "./boitier/products.service";
import {SharedModule} from "../shared/shared.module";
import { NgxPaginationModule } from 'ngx-pagination';
import {ProviderService} from "../provider/provider.service";
import {InstallerService} from "../installer/installer.service";
import {CommandesService} from "../commandes/commandes.service";
import { CartesimComponent } from './cartesim/cartesim.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "../jwt-interceptor";
import {CartesimService} from "./cartesim/cartesim.service";


@NgModule({
  imports: [
      SharedModule,
      HttpClientModule,
      CommonModule,
      FormsModule,
      RouterModule.forChild(ProductsPageroute),
      HttpModule,
      NgxPaginationModule
  ],
  declarations: [ProductsComponent, CartesimComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        ProductsService,ProviderService,InstallerService,CommandesService,CartesimService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    exports:[]

})
export class ProductsModule { }
