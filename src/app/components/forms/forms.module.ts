import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';
import { BasicElementsComponent } from './basic-elements/basic-elements.component';
import {RouterModule} from '@angular/router';
import {FormsRoutes} from './forms.routing';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FormsRoutes),
    SharedModule
  ],
  declarations: [FormsComponent, BasicElementsComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA],

})
export class FormsModule { }
