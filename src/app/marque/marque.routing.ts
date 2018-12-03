import { MarqueComponent } from "./marque.component";
import {Routes} from "@angular/router";

export const MarquePageRoute: Routes = [{

  path: '',
  component: MarqueComponent,
  data: {
    breadcrumb: ''
  }
}];
