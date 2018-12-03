import { PersonalComponent } from "../personal/personal.component";
import {Routes} from "@angular/router";

export const PersonalPageroute: Routes = [{
  path: '',
  component: PersonalComponent,
  data: {
    breadcrumb: 'Liste des Installateurs'
  }
}];
