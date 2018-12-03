import {Routes} from "@angular/router";
import {AgendaComponent} from "./agenda.component";

export const AgendaRouting: Routes = [{
    path: '',
    component: AgendaComponent,
    data: {
        breadcrumb: 'Planing'
    }
}];