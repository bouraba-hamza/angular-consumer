import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
    {
        label: 'Administration',
        main: [
          {
            state: 'utilisateur',
            name: 'Utilisateurs',
            type: 'link',
            icon: 'ti-user'
          },
          // {
          //   state: 'installateur',
          //   name: 'Installateurs',
          //   type: 'link',
          //   icon: 'ti-stamp'
          // }
        ]
    },
    {
        label: 'Tiers',
        main: [

            {
                state: 'provider',
                name: 'Fournisseurs',
                type: 'link',
                icon: 'ti-user'
            },{
                state: 'costumer',
                name: 'Clients',
                type: 'link',
                icon: 'ti-user'
            },
        ],
    },
    {
    label: 'Gestion Des Produits',
    main: [
     {
            state: 'bienetservice',
            name: 'Bien & Service',
            type: 'sub',
            icon: 'ti-layout-grid2-alt',
            children: [
                {
                    state: 'bien',
                    name: 'Bien'
                },
                {
                    state: 'service',
                    name: 'Service'
                }
            ]
        },

    ]
  },{
        label: 'Gestion Commerciale',
        main: [

            {
                state: 'DevisClient',
                name: 'Devis Client',
                type: 'link',
                icon: 'ti-check-box'
            },

        ],
    },
    {
        label: 'Gestion De Stock',
        main: [
          {
            state: 'commande',
            name: 'commande',
            type: 'link',
            icon: 'ti-shopping-cart'
          },
          // {
          //   state: 'products',
          //   name: 'Stock',
          //   type: 'link',
          //   icon: 'ti-shopping-cart-full'
          // },
            {
                state: 'products',
                name: 'Stock',
                type: 'sub',
                icon: 'ti-shopping-cart-full',
                children: [
                    {
                        state: 'boitier',
                        name: 'boitier'
                    },
                    {
                        state: 'cartesim',
                        name: 'Carte Sim'
                    }
                ]
            },


        ],

    },{
        label: 'Gestion Technique',
        main: [

            {
                state: 'vehicule',
                name: 'Vehicule',
                type: 'link',
                icon: 'ti-car'
            },
          {
            state: 'schemavehicule',
            name: 'Schema_véhicules',
            type: 'link',
            icon: 'ti-image'
          },
          {
                state: 'intervenant',
                name: 'Intervention',
                type: 'link',
                icon: 'ti-settings'
            },{
                state: 'FactureIntervention',
                name: 'Intervention Non Facturer',
                type: 'link',
                icon: 'ti-list'
            }
        ],
    },{
        label: 'Gestion financiere',
        main: [

            {
                state: 'FactureClientIntervention',
                name: 'Facture Client Intervention',
                type: 'link',
                icon: 'ti-file'
            },{
                state: 'FactureClient',
                name: 'Facture Client',
                type: 'link',
                icon: 'ti-write'
            },{
                state: 'ReglementClient',
                name: 'Reglement Client',
                type: 'link',
                icon: 'ti-money'
            },{
                state: 'bordereau',
                name: 'Bordereau',
                type: 'link',
                icon: 'ti-export'
            },{
                state: 'FactureProvider',
                name: 'Facture Fournisseur',
                type: 'link',
                icon: 'ti-write'
            },{
                state: 'ReglementProvider',
                name: 'Reglement Fournisseur',
                type: 'link',
                icon: 'ti-money'
            }
            // ,
          // {
          //   state: 'journalisation',
          //   name: 'Journalisations',
          //   type: 'link',
          //   icon: 'ti-folder'
          // }
        ],
    },{
        label: 'Comptes bancaires',
        main: [
            {
                state: 'banque',
                name: 'Banque',
                type: 'link',
                icon: 'ti-shortcode'
            }
        ],
    },{
        label: 'Gestion des Interventions',
        main: [
            {
                state: 'planing',
                name: 'planing',
                type: 'link',
                icon: 'ti-calendar'
            }
        ],
    }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
