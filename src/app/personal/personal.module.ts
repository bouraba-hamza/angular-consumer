import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {AgGridModule} from "ag-grid-angular";
import {NgxPaginationModule} from "ngx-pagination";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {PersonalComponent} from "./personal.component";
import {PersonalService} from "./personal.service";
import {PersonalPageroute} from "./personal.routing";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(PersonalPageroute),
    SharedModule,
    NgxPaginationModule
  ],
  declarations: [PersonalComponent],
  providers: [
    PersonalService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA],
  exports: []
})
export class PersonalModule { }
