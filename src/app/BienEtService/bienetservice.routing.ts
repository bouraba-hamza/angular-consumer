import { Routes } from '@angular/router';
import {ProduitsComponent} from "./produits/produits.component";
import {ServicesComponent} from "./services/services.component";

export const BienEtServiceRoute: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Bien et service',
            status: false
        },
        children: [
            {
                path: 'bien',
                component: ProduitsComponent,
                data: {
                    breadcrumb: 'Liste des produits',
                    status: true
                }
            }, {
                path: 'service',
                component: ServicesComponent,
                data: {
                    breadcrumb: 'Liste des services',
                    status: true
                }
            }
        ]
    }
];
