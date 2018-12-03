import {Routes} from "@angular/router";
import {ReglementClientComponent} from "./reglement-client.component";


export const ReglementClientPageroute: Routes = [{
    path: '',
    component: ReglementClientComponent,
    data: {
        breadcrumb: 'Liste des règlements des clients'
    }
}];
