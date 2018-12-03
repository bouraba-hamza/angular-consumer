import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {DetailsFactureProviderModule} from "./detail-facture-provider/detailsFactureProvider.module";
import { AuthGuard } from './auth/auth.guard';
import { NotfoundComponent } from './auth/notfound/notfound.component';

export const AppRoutes: Routes = [

  {
    path: 'login',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  },
  {
    path: '',
    canActivate:[AuthGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'utilisateur',
        pathMatch: 'full'
      },
        {
        path: 'installer',
        canActivate:[AuthGuard],
        loadChildren: './installer/installer.module#InstallerModule'
      },
        {
            path: 'planing',
            canActivate:[AuthGuard],
            loadChildren: './agenda/agenda.module#AgendaModule'
        },
      {
        path: 'utilisateur',
        canActivate:[AuthGuard],
        loadChildren: './utilisateur/utilisateur.module#UtilisateurModule'
      },
      {
        path: 'commande',
        canActivate:[AuthGuard],
        loadChildren: './commandes/commandes.module#CommandesModule'
      },{
        path: 'table',
        loadChildren: './table/table.module#TableModule'
      },{
        path: 'provider',
        canActivate:[AuthGuard],
        loadChildren: './provider/provider.module#ProviderModule'
      }, {
        path: 'costumer',
        canActivate:[AuthGuard],
        loadChildren: './costumer/costumer.module#CostumerModule'
      },
      {
        path: 'typescustomer',
        canActivate:[AuthGuard],
        loadChildren: './typescustomer/typescustomer.module#TypescustomerModule',
      },
      {
        path: 'typesprovider',
        canActivate:[AuthGuard],
        loadChildren: './typesprovider/typesprovider.module#TypesproviderModule',
      },
      {
        path: 'typesutilisateur',
        canActivate:[AuthGuard],
        loadChildren: './typesutilisateur/typesutilisateur.module#TypesutilisateurModule',
      },
      {
        path: 'modele',
        canActivate:[AuthGuard],
        loadChildren: './modele/modele.module#ModeleModule'
      },
      {
        path: 'marque',
        canActivate:[AuthGuard],
        loadChildren: './marque/marque.module#MarqueModule'
      },
      {
        path: 'journalisation',
        canActivate:[AuthGuard],
        loadChildren: './journalisation/journalisation.module#JournalisationModule'
      },
      {
        path: 'schemavehicule',
        canActivate:[AuthGuard],
        loadChildren: './schemavehicule/schemavehicule.module#SchemavehiculeModule'
      },
      {
        path: 'FactureProvider',
        canActivate:[AuthGuard],
        loadChildren: './facture-provider/factureProvider.module#FactureProviderModule'
      },{
        path: 'DetailFacture/:id',
        canActivate:[AuthGuard],
        loadChildren: './detail-facture-provider/detailsFactureProvider.module#DetailsFactureProviderModule'
      },{
        path: 'DetailFactureClient/:id',
        canActivate:[AuthGuard],
        loadChildren: './detail-facture-client/detailsFactureClient.module#DetailsFactureClientModule'
      },{
        path: 'FactureClient',
        canActivate:[AuthGuard],
        loadChildren: './facture-client/factureClient.module#FactureClientModule'
      },
      {
        path: 'DetailFactureInterventionClient/:id',
        canActivate:[AuthGuard],
        loadChildren: './detail-facture-intervention-client/detailsFactureClient.module#DetailsFactureClientModule'
      },
      {
        path: 'ReglementProvider',
        canActivate:[AuthGuard],
        loadChildren: './reglement-provider/reglementProvider.module#ReglementProviderModule'
      },
      {
        path: 'FactureClientIntervention',
        canActivate:[AuthGuard],
        loadChildren: './facture-client-intervention/factureClientIntervention.module#FactureClientInterventionModule'
      },{
        path: 'FactureIntervention',
        canActivate:[AuthGuard],
        loadChildren: './Facturation-Intervention/interventionNonFacture.module#InterventionNonFactureModule'
      },{
        path: 'DetailDevisClient/:id',
        canActivate:[AuthGuard],
        loadChildren: './detail-devis-client/detailsDevisClient.module#DetailsDevisClientModule'
      },{
        path: 'DevisClient',
        canActivate:[AuthGuard],
        loadChildren: './devis-client/devisClient.module#DevisClientModule'
      },{
        path: 'ReglementClient',
        canActivate:[AuthGuard],
        loadChildren: './reglement-client/reglementClient.module#ReglementClientModule'
      },{
        path: 'bordereau',
        canActivate:[AuthGuard],
        loadChildren: './bordereau-reglement/reglementClient.module#ReglementClientModule'
      },{
        path: 'banque',
        canActivate:[AuthGuard],
        loadChildren: './Banque/banque.module#BanqueModule'
      },{
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },{
        path: 'vehicule',
        canActivate:[AuthGuard],
        loadChildren: './vehicule/vehicule.module#VehiculeModule'
      },{
        path: 'bienetservice',
        canActivate:[AuthGuard],
        loadChildren: './BienEtService/produits.module#ProduitsModule'
      },
      {
        path: 'products',
        canActivate:[AuthGuard],
        loadChildren: './products/products.module#ProductsModule'
      },
      {
        path: 'intervenant' ,
        canActivate:[AuthGuard],
        loadChildren: './intervenant/intervenant.module#IntervenantModule'

      },{
        path: 'detail_intervention/:id',
        canActivate:[AuthGuard],
        loadChildren: './detail-intervention/detail-intervention.module#DetailInterventionModule'
        // component:DetailInterventionComponent
      },
      {
        path: 'basic',
        loadChildren: './components/basic/basic.module#BasicModule'
      }, {
        path: 'advance',
        loadChildren: './components/advance/advance.module#AdvanceModule'
      }, {
        path: 'forms',
        loadChildren: './components/forms/forms.module#FormsModule'
      }, {
        path: 'bootstrap-table',
        loadChildren: './components/tables/bootstrap-table/bootstrap-table.module#BootstrapTableModule',
      }, {
        path: 'map',
        loadChildren: './map/map.module#MapModule',
      }
    ]
  }, {
    path: '**',
    component: NotfoundComponent
  }];
