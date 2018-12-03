import {PersonalComponent} from "../personal/personal.component";
import {Routes} from "@angular/router";
import {DetailPersonalComponent} from "./detail-personal.component";

export const DetailPersonalPageroute: Routes = [{
  path: '',
  component: DetailPersonalComponent,
  data: {
    breadcrumb: 'Détail installateur'
  }
}];
