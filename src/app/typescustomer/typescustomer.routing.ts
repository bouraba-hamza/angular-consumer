import { TypescustomerComponent } from "./typescustomer.component";
import {Routes} from "@angular/router";

export const TypesCustomerPageRoute: Routes = [{

  path: '',
  component: TypescustomerComponent,
  data: {
    breadcrumb: ''
  }
}];
