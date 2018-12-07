import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";

import {RouterModule} from '@angular/router';

import { CommandesRouting } from './commandes.routing';
import {CommandesComponent} from './commandes.component';
import {CommandesPageroute} from './commandes.routing';
import {CommandesService} from "./commandes.service";
import {FormsModule} from '@angular/forms';
import {SharedModule} from "../shared/shared.module";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import {ProviderService} from "../provider/provider.service";
import { ModalModule, BsModalRef } from 'ngx-bootstrap';
import {JwtInterceptor} from "../jwt-interceptor";
import {ErrorInterceptor} from "../error-interceptor";





@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(CommandesPageroute),
      FormsModule,
      HttpClientModule,
      SharedModule,
      AgGridModule,
      NgxPaginationModule,
      ModalModule.forRoot()

  ],

  declarations: [CommandesComponent],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      CommandesService,ProviderService,BsModalRef],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class CommandesModule { }
