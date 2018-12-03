import { ModeleComponent } from "./modele.component";
import {Routes} from "@angular/router";

export const ModelePageRoute: Routes = [{

  path: '',
  component: ModeleComponent,
  data: {
    breadcrumb: ''
  }
}];
