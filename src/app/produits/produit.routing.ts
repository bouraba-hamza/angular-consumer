import { ProduitsComponent } from "../produits/produits.component";
import {Routes} from "@angular/router";

export const ProduitsPageroute: Routes = [{
  path: '',
  component: ProduitsComponent,
  data: {
    breadcrumb: 'Liste des produits'
  }
}];
