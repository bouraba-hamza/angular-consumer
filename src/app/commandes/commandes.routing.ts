import { Routes } from '@angular/router';
import { CommandesComponent} from './commandes.component';

export const CommandesPageroute: Routes = [ { path:'' , component:CommandesComponent,
    data: {
        breadcrumb: 'Liste des commandes'
    }}];


export class CommandesRouting { }
