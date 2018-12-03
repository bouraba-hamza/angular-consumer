import {DevisClientComponent} from "./devis-client.component";

import {Routes} from "@angular/router";

export const DevisClientPageroute: Routes = [{
    path: '',
    component: DevisClientComponent,
    data: {
        breadcrumb: 'Liste des devis des clients'
    }
}];
