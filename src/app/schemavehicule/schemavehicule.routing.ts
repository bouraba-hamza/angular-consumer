import { SchemavehiculeComponent } from "../schemavehicule/schemavehicule.component";
import {Routes} from "@angular/router";

export const SchemavehiculePageroute: Routes = [{
  path: '',
  component: SchemavehiculeComponent,
  data: {
    breadcrumb: 'Liste des Schémas'
  }
}];
