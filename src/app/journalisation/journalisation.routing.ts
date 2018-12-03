import { JournalisationComponent } from "./journalisation.component";
import {Routes} from "@angular/router";

export const JournalisationPageroute: Routes = [{
  path: '',
  component: JournalisationComponent,
  data: {
    breadcrumb: 'Liste des Journalisations'
  }
}];
