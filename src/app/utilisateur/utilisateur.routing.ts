import {Routes} from "@angular/router";
import {UtilisateurComponent} from "../utilisateur/utilisateur.component";

export const UtilisateurPageroute: Routes = [{
  path: '',
  component: UtilisateurComponent,
  data: {
    breadcrumb: 'Liste des Utilisateurs'
  }
}];
