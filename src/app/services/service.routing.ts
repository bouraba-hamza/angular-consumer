import { ServicesComponent } from "./services.component";
import {Routes} from "@angular/router";

export const ServicesPageroute: Routes = [{
    path: '',
    component: ServicesComponent,
    data: {
        breadcrumb: 'Liste des services'
    }
}];
