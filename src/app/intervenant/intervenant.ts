import {FormControl} from "@angular/forms";

export class Intervenant {
    'id_intervention':number;
    'intervened_at':Date;
    'id_instalateur':number;
    'remarque':string;
    'id_costumer':number;
    'costumer_id':number;
    'validation_resp':string;
    'status':string;
    'user_id':number;
    'nbr_installation':number;
    'upload':string;
    'categorie': number;
    'intervention_id':number;
    'intervention':string;
    'kilometrage':number;
    'vehicule_select':number;
    'imei_carte':number;
    'type':string;
    'imei_boitier':number;
    'imei':string;
    'marque':string;
    'model':string;
    'box_costumer':string;
    'sim_costumer':string;
    'duration':string;
    'vehicule':string;

    'detail_id':number;
    'imei_box':string;
    'imei_sim':string;
    'target':string;
    'data':string;


    'starthour':string;
    'endhour':string;


    'refcommande_boitier':number;
    'refcommande_sim':number;
    'imei_product':string;
    'ssid':string;
    'model_sim':number;
    'model_boitier':number;
    'numero':string;
    'etat':string;

    'stock':number;
    'oldcb_box':string;
    'newcb_box':string;
    'oldcs_sim':string;
    'newcs_sim':string;

    'oldBoxCb_update':string;
    'newBoxCb_update':string;
    'oldSimCs_update':string;
    'newSimCs_update':string;

}
