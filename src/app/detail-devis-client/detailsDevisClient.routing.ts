import { DetailDevisClientComponent } from "./detail-devis-client.component";
import {Routes} from "@angular/router";

export const DetailDevisClientPageroute: Routes = [{
    path: '',
    component: DetailDevisClientComponent,
    data: {
        breadcrumb: 'Détail des devis des clients'
    }
}];
