import {TypesUtilisateurPageRoute} from "./typesutilisateur.routing";
import {AgGridModule} from "ag-grid-angular";
//import {CardComponent} from "../shared/card/card.component";
import { NgxPaginationModule } from 'ngx-pagination';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import {TypesutilisateurComponent} from "./typesutilisateur.component";
import {TypesutilisateurService} from "./typesutilisateur.service";
import {JwtInterceptor} from "../jwt-interceptor";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(TypesUtilisateurPageRoute),
    SharedModule,
    NgxPaginationModule

  ],
  declarations: [TypesutilisateurComponent ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

      TypesutilisateurService
  ],
})
export class TypesutilisateurModule { }
