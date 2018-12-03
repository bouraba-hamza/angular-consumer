import {ImportProductComponent} from "./import-product.component";

import {Routes} from "@angular/router";

export const CommandePageRoute: Routes = [{
    path: '',
    component: ImportProductComponent,
    data: {
        breadcrumb: 'produits Page'
    }
}];
