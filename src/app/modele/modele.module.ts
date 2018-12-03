import {ModelePageRoute} from "./modele.routing";
import {AgGridModule} from "ag-grid-angular";
//import {CardComponent} from "../shared/card/card.component";
import { NgxPaginationModule } from 'ngx-pagination';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ModeleComponent} from "./modele.component";
import {ModeleService} from "./modele.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(ModelePageRoute),
    SharedModule,
    NgxPaginationModule

  ],
  declarations: [ModeleComponent ],
  providers: [
    ModeleService
  ],
})
export class ModeleModule { }
