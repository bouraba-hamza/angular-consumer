import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './agenda.component';
import { CostumerService } from '../costumer/costumer.service';
import { InstallerService } from '../installer/installer.service';
import { AgendaService } from './agenda.service';
import {RouterModule} from "@angular/router";

import {BanquePageroute} from "../Banque/banque.routing";
import {AgendaRouting} from "./agenda.routing";
import {SharedModule} from "../shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
 import { AngularDateTimePickerModule } from 'angular2-datetimepicker';


@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        RouterModule.forChild(AgendaRouting),
        AngularDateTimePickerModule

  ],
  
  declarations: 
  [
    AgendaComponent,
  ],
  providers: [AgendaService,CostumerService,InstallerService],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA],


})
export class AgendaModule { }
