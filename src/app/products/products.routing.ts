import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from "./boitier/products.component";
import {CartesimComponent} from "./cartesim/cartesim.component";




export const ProductsPageroute: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Liste des produits',
            status: false
        },
        children: [
            {
                path: 'boitier',
                component: ProductsComponent,
                data: {
                    breadcrumb: 'Liste des boitiers',
                    status: true
                }
            }, {
                path: 'cartesim',
                component: CartesimComponent,
                data: {
                    breadcrumb: 'Liste des Carte Sim',
                    status: true
                }
            }
        ]
    }
];


