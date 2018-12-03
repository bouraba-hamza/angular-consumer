import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

import {BootstrapTableRoutes} from './bootstrap-table.routing';
import { BootstrapTableComponent } from './bootstrap-table.component';
import { BasicComponent } from './basic/basic.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BootstrapTableRoutes),
    SharedModule
  ],
  declarations: [BootstrapTableComponent, BasicComponent],

    schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA],

})
export class BootstrapTableModule { }
