
import {Component, OnInit, EventEmitter , Output , Input} from '@angular/core';
import { HostListener } from "@angular/core";
import { Subscription, Observable } from "rxjs";


import { $ } from '../../../node_modules/protractor';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';

import { ViewChild } from '@angular/core';

import { mapTo } from 'rxjs/operators';
import { merge } from '../../../node_modules/rxjs/observable/merge';
import { fromEvent } from '../../../node_modules/rxjs/observable/fromEvent';
import { of } from '../../../node_modules/rxjs/observable/of';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
 
import { Location } from '@angular/common';
import { ProduitsComponent } from '../produits/produits.component';
import { IfObservable } from '../../../node_modules/rxjs/observable/IfObservable';
import { ProduitService } from '../produits/produits.service';
import { Produits  } from '../produits/Produits';
import { Http } from '../../../node_modules/@angular/http';
import { HttpClient } from '../../../node_modules/@angular/common/http';
// import { MessageService } from '../message.service';

// import {default as data_json } from '../../assets/json_products.json';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }      from '@angular/http';
import { AppComponent } from '../app.component';
import {IndexedDBAngular} from 'indexeddb-angular';
 


@Component({
  selector: 'app-check-connectivity',
  templateUrl: './check-connectivity.component.html',
  styleUrls: ['./check-connectivity.component.css']
})
 
export class CheckConnectivityComponent implements OnInit {


   date_actuelle = this.get_current_date() ;

   // route: string;
   // messageService : MessageService;
    /* ----------------------------------------  Check Connectivity ---------------------------------------- */
  
    public  isOnline: boolean;
    public  showConnectionStatus: boolean;
    public showConnectionStatusSub: Subscription;
    public showConnectionStatusTimer: Observable<any>;
   
    public val_connection_state = 'online' ;
    public btn_save_offline ;

    closeResult: string;

    public isOnline_simple: Boolean;
    public current_root;
    public current_methode = "???";

    public current_methode_ = "???";
    public currentCompoment: any ;


    public produitsComponent: ProduitsComponent ;
    public xComponent: any ;
    public current_date :String;
    public date_now: Date;

    public array_save_val_json: any ;

    public return_bool : Number = 123 ;

    public db = new IndexedDBAngular('backup_db', 1);

    public array_load_x_class : any ;

   public current_list_load_parsed_viewHtml = new Array;

   public current_size_storage_view_html;


    @ViewChild('contentSaveOffline')  private content_offline;
    // // @ViewChild('contentBackupOnline') private content_online;






    message: string = 'valeur réponse CheckConnectivity' ;

    @Output() messageEvent = new EventEmitter();

    sendMessage(){
        this.messageEvent.emit(this.message);
    }





    constructor(private modalService: NgbModal , public http: HttpClient /* ,private http_: Http*/ ) { 
    }


/* 
    receiveMessage($event){
      this.message = $event ;
      console.log('receiveMessage = '+this.message);
    }
*/



    ngOnInit() {
    //  window.localStorage['storageName'] = 'hamza';
     this.isOnline_simple  = navigator.onLine;
     console.log('isOnline  => '+ this.isOnline_simple);

     this.initialize_host_listener();
     this.view_current_list_load_parsed_viewHtml();
    } 



   
    initialize_host_listener(){
        if( navigator.onLine){
            this.val_connection_state = 'online' ;
        }else{
            this.val_connection_state = 'offline' ;
        }
    }


    view_current_list_load_parsed_viewHtml(){
        let current_size_storage = window.localStorage.length ;
         this.current_size_storage_view_html = window.localStorage.length ;
        if(this.current_size_storage_view_html == 3){
            this.current_size_storage_view_html = 0 ;
        }
        let current_storage_data  ;

        if(current_size_storage > 3){
            for(let i=3 ; i<current_size_storage ; i++){
                current_storage_data = window.localStorage.getItem(''+i);
                current_storage_data = JSON.parse(current_storage_data); 
                console.log(current_storage_data);

                // let current_array_val_json = JSON.parse(current_storage_data[4]);
               //  console.log(current_array_val_json);
               

                this.current_list_load_parsed_viewHtml .push( 
                  current_storage_data[1] +' ------- '
                + current_storage_data[2] +' ------- '
                + current_storage_data[3] +' ------- [ '
                + current_storage_data[4]
                +' ]'
                /*
                + current_storage_data[4].id
                +' --- '+ current_storage_data[4].NomProduit
                +' --- '+ current_storage_data[4].DescriptionProduit
                +' --- '+ current_storage_data[4].DescriptionFacture
                +' --- '+ current_storage_data[4].PrixVente
                +' --- '+ current_storage_data[4].PrixVenteMin
                +' --- '+ current_storage_data[4].TauxTVA
                +' --- '+ current_storage_data[4].EtatVente
                +' --- '+ current_storage_data[4].EtatAchat
                +' --- '+ current_storage_data[4].TypeProduit
                +' ]'
*/

            );
            }
         }




        /*
        this.db.createStore(1, (evt) => {
            let objectStore = evt.currentTarget.result.createObjectStore(
                 'liste_product', { keyPath: "id", autoIncrement: true }
            );
          //  objectStore.createIndex("date", "date", { unique: false });
          //  objectStore.createIndex("date", "date", { unique: true });
    }).then(() => {
        this.db.getAll('liste_product').then((people) => {
              let checkConnectivityComponent = new CheckConnectivityComponent(this.modalService,this.http ); 
              checkConnectivityComponent.array_load_x_class = people ;

               let current_list_load = checkConnectivityComponent.array_load_x_class ;
               var current_list_load_parsed= new Array();
               

               for(let i=0 ; i<current_list_load.length ; i++){
               let current_obj = JSON.parse(current_list_load[i].Value) ;
               // current_list_load_parsed.push(current_obj);

               this.current_list_load_parsed_viewHtml.push(current_obj.id
                +' --- '+ current_obj.NomProduit
                +' --- '+ current_obj.DescriptionProduit
                +' --- '+ current_obj.DescriptionFacture
                +' --- '+ current_obj.PrixVente
                +' --- '+ current_obj.PrixVenteMin
                +' --- '+ current_obj.TauxTVA
                +' --- '+ current_obj.EtatVente
                +' --- '+ current_obj.EtatAchat
                +' --- '+ current_obj.TypeProduit) ;
               }
 

                console.log( this.current_list_load_parsed_viewHtml);
              

               
               // go AFFICHER LES PRODUIT , product Service
               console.log('go AFFICHER LES PRODUIT , product Service');
               

        }, (error) => {
            console.log(error);
        });
    });
        */
    }

      
    @HostListener('window:offline', ['$event']) onOffline() {
        this.isOnline = false;
        this.showConnectionStatus = true;
        if (this.showConnectionStatusSub) {
            this.showConnectionStatusSub.unsubscribe();
        }
        console.log('HostListener : offline');
        this.val_connection_state = 'offline' ;
     //   this.open(this.content_offline);
       // return this.isOnline ;
        return 0 ;   
    }
    




    @HostListener('window:online', ['$event']) onOnline() {
      this.isOnline = true;
      this.showConnectionStatus = true;
      if (this.showConnectionStatusSub) {
          this.showConnectionStatusSub.unsubscribe();
      }
      console.log('HostListener : online');
      this.val_connection_state = 'online' ;
     // return this.isOnline ;
      return 1 ;
  }





    ngOnDestroy(): void {
        if (this.showConnectionStatusSub) {
            this.showConnectionStatusSub.unsubscribe();
        }
    }






    simple_check_net():Boolean{
        let etat_connex  = navigator.onLine;
        return etat_connex ;
        // test final via PING
    }







// get rows , indexed database
public get_all_data_bd_backup(db, table_name : String, date_val : any, array_val : any){
 
    db.createStore(1, (evt) => {
        let objectStore = evt.currentTarget.result.createObjectStore(
             ''+table_name, { keyPath: "id", autoIncrement: true }
        );
      //  objectStore.createIndex("date", "date", { unique: false });
      //  objectStore.createIndex("date", "date", { unique: true });
}).then(() => {
    db.getAll(''+table_name).then((people) => {
        // console.log(returned_list);
          let checkConnectivityComponent = new CheckConnectivityComponent(this.modalService,this.http ); 
          checkConnectivityComponent.array_load_x_class = people ;
       //   console.log(checkConnectivityComponent.array_load_x_class);
    }, (error) => {
        console.log(error);
    });
}); 
} // END get_all_data_bd_backup








// add rows , indexed database
 public add_data_bd_backup(db, table_name : String, date_val : any, array_val : any){
        db.createStore(1, (evt) => {
            let objectStore = evt.currentTarget.result.createObjectStore(
                table_name+'', { keyPath: "id", autoIncrement: true }
            );
          //  objectStore.createIndex("date", "date", { unique: false });
          //  objectStore.createIndex("date", "date", { unique: true });
    }).then(() => {
        db.add(''+table_name, { Key: date_val+'', Value: array_val+'' }).then(() => {
            // Do something after the value was added
            console.log('fields added');
        }, (error) => {
            console.log('error is'+error);
        });
    }); 
 } // END add_data_bd_backup








// clear rows , indexed database
 public truncate_object_data_bd_backup(db, table_name : String, date_val : any, array_val : any){
    db.createStore(1, (evt) => {
        let objectStore = evt.currentTarget.result.createObjectStore(
            table_name+'', { keyPath: "id", autoIncrement: true }
        );
      //  objectStore.createIndex("date", "date", { unique: false });
      //  objectStore.createIndex("date", "date", { unique: true });
}).then(() => {
    db.clear(''+table_name).then(() => {
        // Do something after clear
    }, (error) => {
        console.log(error);
    });
}); 
} // END truncate_object_data_bd_backup







    /*
    public getJSON(): void {
      //  return this.http.get("../../assets/json_products.json");
      ///  console.log(data_json);
       this.http.get("../../assets/json_products.json");
    }
    */

    

    
    

  
      open(content) {
        this.modalService.open(content, {size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    
  




    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
  }







   public compt = 0 ;

   check_connection():Boolean{
    this.isOnline_simple  = navigator.onLine;
    console.log('isOnline  => '+ this.isOnline_simple);

    return this.isOnline_simple;
}









  get_connection_state(current_root: String , current_component : String , current_methode: String , modalService: NgbModal , xComponent: any  )
{     
 

   function myCallback() {

    this.checkConnectivityComponent = new CheckConnectivityComponent(modalService,this.http ); 
    this.val_check_connection =  this.checkConnectivityComponent.check_connection();

    if(this.val_check_connection == true ){
         
        


        console.log('-------------------------');
        this.val_connection_state = 'online' ;
        console.log('val_connection_state  =  '+this.val_connection_state); 
   
        console.log('****************************** online ********************************');
        // let current_component_name = xComponent.route.component.name ;
        let current_component_name = ''+current_component ;

        this.date_now = new Date();
        let dd = this.date_now.getDate();
        let mm = this.date_now.getMonth();
        let yyyy = this.date_now.getFullYear();
        let hours = this.date_now.getHours() ;
        let minute = this.date_now.getMinutes() ;
        let secondes = this.date_now.getSeconds();
        this.current_date = dd+'/'+mm+'/'+yyyy+' '+hours+':'+minute+':'+secondes   ;

        console.log('Le : '+ this.current_date); 
        console.log('Component name  ->  ' + current_component_name); // ProductCompoment
        console.log('Methode ->  ' + current_methode); // manuellement lors de l appel
     //   console.log('Value Post -> ') ;
     //   console.log(xComponent.produitPost);  

        console.log('----------- ECRASER JSON FILE BACKUP -----------');
        console.log('Ecraser json file -> ../../assets/json_prducts.json  avec les données suivantes : ');
        console.log(xComponent);


    // -----------------------------------------------------------------------------------------
    // ----------------  DATABASE BACKUP SAVE AFFICHAGE CLASSES , SYNCHRONISATION  ------------------  
   //     console.log(" ----------------  DATABASE BACKUP SAVE AFFICHAGE CLASSES , SYNCHRONISATION  ------------------");
        
        // vider la table en question
        this.checkConnectivityComponent.truncate_object_data_bd_backup(this.checkConnectivityComponent.db,''+current_root,''+this.checkConnectivityComponent.date_actuelle, null );
         
        // boucler sur les valeurs recus du serveur et les save dans la table en question
        for(let i = 0 ; i<xComponent.length ; i++){
        //  console.log(xComponent[i]);
         
        this.checkConnectivityComponent.add_data_bd_backup(this.checkConnectivityComponent.db,''+current_root,''+this.checkConnectivityComponent.date_actuelle,   
        JSON.stringify(xComponent[i])
        );
        
       }

       // this.checkConnectivityComponent.get_all_data_bd_backup(this.checkConnectivityComponent.db,'liste_product','','');

    //    console.log(" ---------------- END  DATABASE BACKUP SAVE AFFICHAGE CLASSES , SYNCHRONISATION  ------------------");
    // -----------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------

        console.log('----------- END ECRASER JSON FILE BACKUP -----------');

        console.log('****************************** END online ********************************');

        // verifié variable storage si elle contien des éléments
        this.checkConnectivityComponent.check_storage_and_resave_data();
 


    }   
    else
    {    // affichage notif Offline_save_mode
       



        console.log('---------------------------------------------------------------------');
        this.val_connection_state = 'offline' ;
       
        console.log('val_connection_state  =  '+this.val_connection_state); 
      //  this.open(this.productComponent.contentNotifOffline);
        
        this.date_now = new Date();
        let dd = this.date_now.getDate();
        let mm = this.date_now.getMonth();
        let yyyy = this.date_now.getFullYear();
        let hours = this.date_now.getHours() ;
        let minute = this.date_now.getMinutes() ;
        let secondes = this.date_now.getSeconds();
        this.current_date = dd+'/'+mm+'/'+yyyy+' '+hours+':'+minute+':'+secondes   ;

       console.log('**********************');

       let current_component_name_auto = current_component;  // ProductCompoment
       let current_component_name =   current_component_name_auto ;  // 'ProductComponent' 
       console.log('============================================================================');
       console.log('current_component_name  ===> '+current_component_name);  // full object  ProductComponent
       console.log('============================================================================');
       console.log('Le : '+ this.current_date);                      // funtion get_current_date
      // console.log('Component name  ->  ' + current_component_name); // ProductCompoment
       console.log('Methode ->  ' + current_methode); // manuellement lors de l appel
     //  console.log('Value Post -> ') ;
     //  console.log(xComponent.produitPost);   // données json val passées
       console.log('**********************');
       












       switch(current_component_name) {




        case 'ProductComponent':
        console.log('Switch  Component -> '+current_component_name);


        if(current_methode == 'addProduct'){



            var xComp_post = xComponent ;
            // creer objet de valeurs informatives et array_val
            this.array_save_val_json = [this.val_connection_state ,  this.current_date , current_component_name ,  current_methode ,  JSON.stringify(xComp_post)] ;
            // get indice du new row for storage ...
            let current_size_storage = window.localStorage.length ; 
            // save in storage 
            window.localStorage.setItem(''+current_size_storage, JSON.stringify(this.array_save_val_json));
           // load du storage
            let current_storage_data = window.localStorage.getItem(''+current_size_storage);
            current_storage_data = JSON.parse(current_storage_data);
            console.log('current_storage_data ---> '); 
            console.log(current_storage_data);
            // load  array_val du current_row du storage
            let current_array_val_json = JSON.parse(current_storage_data[4]);
            console.log('current_array_val_json : '+current_size_storage+' ---> '); 
            console.log(current_array_val_json);
    
    
            
            }else if(current_methode == 'updateProduct'){
            
    
    
            var xComp_post = xComponent ;
            // creer objet de valeurs informatives et array_val
            this.array_save_val_json = [this.val_connection_state ,  this.current_date , current_component_name ,  current_methode ,  JSON.stringify(xComp_post)] ;
            // get indice du new row for storage ...
            let current_size_storage = window.localStorage.length ; 
            // save in storage 
            window.localStorage.setItem(''+current_size_storage, JSON.stringify(this.array_save_val_json));
           // load du storage
            let current_storage_data = window.localStorage.getItem(''+current_size_storage);
            current_storage_data = JSON.parse(current_storage_data);
            console.log('current_storage_data ---> '); 
            console.log(current_storage_data);
            // load  array_val du current_row du storage
            let current_array_val_json = JSON.parse(current_storage_data[4]);
            console.log('current_array_val_json : '+current_size_storage+' ---> '); 
            console.log(current_array_val_json);
    
    
            }else if(current_methode == 'deleteProduit'){
    
    
            var xComp_post = xComponent ;
            // creer objet de valeurs informatives et array_val
            this.array_save_val_json = [this.val_connection_state ,  this.current_date , current_component_name ,  current_methode ,  xComp_post] ;
            // get indice du new row for storage ...
            let current_size_storage = window.localStorage.length ; 
            // save in storage 
            window.localStorage.setItem(''+current_size_storage, JSON.stringify(this.array_save_val_json));
           // load du storage
            let current_storage_data = window.localStorage.getItem(''+current_size_storage);
            current_storage_data = JSON.parse(current_storage_data);
            console.log('current_storage_data ---> '); 
            console.log(current_storage_data);
            // load  array_val du current_row du storage
            let current_array_val_json = current_storage_data[4] ;
            console.log('current_array_val_json : '+current_size_storage+' ---> '); 
            console.log(current_array_val_json);
    
    
            }else if(current_methode == 'getProducts'){ 
    
    
             //   console.log('------------------------ getProducts ------------------------');  
             //   console.log(xComponent); 
                console.log('||||||||||||||||||||||| BACKUP -> JSON FILE BACKUP ||||||||||||||||||');
                //   console.log(xComponent);
                   console.log('Backup from Local Database indexed ');
                        // ----------------------------------------------------------------------------------------------
                        // ----------------  DATABASE BACKUP AFFICHAGE CLASSES , SYNCHRONISATION  ------------------  
                        
                
                        console.log('-------1 checkConnectivityComponent.db.createStore ----> '+current_root);
                        this.checkConnectivityComponent.db.createStore(1, (evt) => {
                            let objectStore = evt.currentTarget.result.createObjectStore(
                                 ''+current_root, { keyPath: "id", autoIncrement: true }
                            );
                          //  objectStore.createIndex("date", "date", { unique: false });
                          //  objectStore.createIndex("date", "date", { unique: true });
                          console.log('-------2 checkConnectivityComponent.db.createStore ----> '+current_root);
                    }).then(() => {
                        this.checkConnectivityComponent.db.getAll(''+current_root).then((people) => {
                              let checkConnectivityComponent = new CheckConnectivityComponent(this.modalService,this.http ); 
                              checkConnectivityComponent.array_load_x_class = people ;
    
                               let current_list_load = checkConnectivityComponent.array_load_x_class ;
                               var current_list_load_parsed= new Array();
                               
    
                               for(let i=3 ; i<current_list_load.length ; i++){
                               let current_obj = JSON.parse(current_list_load[i].Value) ;
                               current_list_load_parsed.push(current_obj);
                               }
    
                               console.log(current_list_load_parsed);
 
                               
                               // go AFFICHER LES PRODUIT , product Service
                               console.log('go AFFICHER LES PRODUIT , product Service');
                               
    
                        }, (error) => {
                            console.log(error);
                        });
                    });
                     
                 
                   console.log('|||||||||||||||||| END BACKUP ->  JSON FILE BACKUP ||||||||||||||||||');
            
             //   console.log('------------------------ End getProducts ------------------------');     
    
            } // end else if class methode
    

         break; 





         case 'VehiculeComponent':
         console.log('Switch  Component -> '+current_component_name);
         break;


         case 'CustomerComponent':
         console.log('Switch  Component -> '+current_component_name);
         break;


         case 'InstallationComponent':
         console.log('Switch  Component -> '+current_component_name);
         break;



         default :
       }









       console.log('---------------------------------------------------------------------');

  
    } // end  if else  (val_check_connection == true / false )
    
  } // end myCallback

 setTimeout( myCallback ,  500 ) ;

} // end get_connection_state







    get_current_date() : String{
    this.date_now = new Date();
    let dd = this.date_now.getDate();
    let mm = this.date_now.getMonth();
    let yyyy = this.date_now.getFullYear();
    let hours = this.date_now.getHours() ;
    let minute = this.date_now.getMinutes() ;
    let secondes = this.date_now.getSeconds();
    let current_date_ = dd+'/'+mm+'/'+yyyy+' '+hours+':'+minute+':'+secondes   ;
    return current_date_ ;
    } // End get_current_date()





    check_storage_and_resave_data(http : HttpClient ) {

        var checkConnectivityComponent = new CheckConnectivityComponent(this.modalService,this.current_root );
        var val_check_connection =  checkConnectivityComponent.check_connection();
        if( val_check_connection == true ){

        console.log('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||');

                // get indice du new row for storage ...
                let current_size_storage = window.localStorage.length ;

        console.log('||||||||||||||||||||| - check_storage_and_resave_data : Go ReSave DATA rows ... ['+current_size_storage+' rows] |||||||||||||||||||||');

                if(current_size_storage > 3){
                    for(let i=3 ; i<current_size_storage ; i++){
                        let current_storage_data = window.localStorage.getItem(''+i);
                        current_storage_data = JSON.parse(current_storage_data);
                        this.resave_data_localStorage(i,current_storage_data,http);
                    }
                 } // end if(current_size_storage > 0)

       console.log('|||||||||||||||||||||||||||||| - END check_storage_and_resave_data  ... |||||||||||||||||||||||||||||');
       console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||');
     } // END if( val_check_connection == true )
    } // END check_storage_and_resave_data








resave_data_localStorage( i : Number , current_storage_data_ : any , http : HttpClient ){
  console.log('|||||||||||||||||||||  --- resave_data_localStorage ['+i+'] --- |||||||||||||||||||||');
  console.log(current_storage_data_);
  console.log(current_storage_data_[2]); // ClassCompoment
  console.log(current_storage_data_[3]); // methode
  console.log(current_storage_data_[4]); // array vals json

  switch(current_storage_data_[2]) {
    case 'ProductComponent':

                     switch(current_storage_data_[3]) {


                        case 'getProducts':
                         console.log('ProductComponent -> getProducts');
                         break;


                         case 'addProduct':
                         
                            console.log('ProductComponent -> addProduct');
                            let  productService  = new ProduitService(http);
 
                            let current_array_val_json = JSON.parse(current_storage_data_[4]);
                            var produit =  new Produits();
                            produit.RefProduit         = current_array_val_json.RefProduit;
                            produit.NomProduit         = current_array_val_json.NomProduit;
                            produit.DescriptionProduit = current_array_val_json.DescriptionProduit;
                            produit.DescriptionFacture = current_array_val_json.DescriptionFacture;
                            produit.PrixVente          = current_array_val_json.PrixVente;
                            produit.PrixVenteMin       = current_array_val_json.PrixVenteMin;
                            produit.TauxTVA            = current_array_val_json.TauxTVA;
                            produit.EtatVente          = current_array_val_json.EtatVente;
                            produit.TypeProduit        = current_array_val_json.TypeProduit;
                            produit.EtatAchat          = current_array_val_json.EtatAchat;
                          
                            console.log('--------- productService.addProduct(current_storage_data_[4]) -------');
                            current_array_val_json = JSON.parse(current_storage_data_[4]);
                            console.log(current_array_val_json);  //   console.log(current_storage_data_[4]);
                            

                         // this.xComponent.addProduct(produit);
                         console.log(produit);


                            let rep = productService.addProduct(  produit ).subscribe(data=>{
                              console.log(data);
                            })

                             
                            productService.getProduits();

                            console.log('rep addProduct '+rep);
                          //  window.localStorage.getItem(''+i);
                            window.localStorage.removeItem(''+i);
                        // remove current row from LocalStorage and re fetch it


                         //   this.open(productComponent.contentNotifOnline);
                             break;




                         case  'updateProduct':
                         console.log('ProductComponent -> updateProduct');
                         productService  = new ProduitService(http);

                          current_array_val_json = JSON.parse(current_storage_data_[4]);

                         var produit =  new Produits();
                         produit.id         = current_array_val_json.id;
                         produit.RefProduit         = current_array_val_json.RefProduit;
                         produit.NomProduit         = current_array_val_json.NomProduit;
                         produit.DescriptionProduit = current_array_val_json.DescriptionProduit;
                         produit.DescriptionFacture = current_array_val_json.DescriptionFacture;
                         produit.PrixVente          = current_array_val_json.PrixVente;
                         produit.PrixVenteMin       = current_array_val_json.PrixVenteMin;
                         produit.TauxTVA            = current_array_val_json.TauxTVA;
                         produit.EtatVente          = current_array_val_json.EtatVente;
                         produit.TypeProduit        = current_array_val_json.TypeProduit;
                         produit.EtatAchat          = current_array_val_json.EtatAchat;

                         console.log('--------- productService.updateProduit(current_storage_data_[4]) -------');
                        // current_array_val_json = JSON.parse(current_storage_data_[4]);
                        // console.log(current_array_val_json);  //   console.log(current_storage_data_[4]);
                         
                         console.log('PRODUIT A MODIFIE ==> '+produit); // OK
                           rep = productService.updateProduit(  produit ).subscribe(data=>{
                           console.log(data);
                         })

                         productService.getProduits();


                         console.log('rep updateProduit ');
                         console.log(rep);
                         console.log(rep.closed);
                         window.localStorage.removeItem(''+i);
                             break;






                             case  'deleteProduit':
                             console.log('ProductComponent -> deleteProduit');
                             productService  = new ProduitService(http);

                              current_array_val_json = current_storage_data_[4];

                             var produit =  new Produits();
                             produit.id                 = current_array_val_json.id;
                             produit.RefProduit         = current_array_val_json.RefProduit;
                             produit.NomProduit         = current_array_val_json.NomProduit;
                             produit.DescriptionProduit = current_array_val_json.DescriptionProduit;
                             produit.DescriptionFacture = current_array_val_json.DescriptionFacture;
                             produit.PrixVente          = current_array_val_json.PrixVente;
                             produit.PrixVenteMin       = current_array_val_json.PrixVenteMin;
                             produit.TauxTVA            = current_array_val_json.TauxTVA;
                             produit.EtatVente          = current_array_val_json.EtatVente;
                             produit.TypeProduit        = current_array_val_json.TypeProduit;
                             produit.EtatAchat          = current_array_val_json.EtatAchat;

                             console.log('--------- productService.delete(current_storage_data_[4]) -------');
                            // current_array_val_json = JSON.parse(current_storage_data_[4]);
                            // console.log(current_array_val_json);  //   console.log(current_storage_data_[4]);

                             console.log('PRODUIT A Supprimer ==> '+produit); // OK
                               rep = productService.deleteProduit(  produit ).subscribe(data=>{
                               console.log(data);
                             })

                             productService.getProduits();
                             
                             console.log('rep deleteProduit '+rep);
                             window.localStorage.removeItem(''+i);
                                 break;




                         default:
                     }
 
       //   this.open(productComponent.contentNotifOnline);
        break;   


    case  'VehiculeComponent':
     //   code block
        break;


    default:
     //   code block

} // End switch
  
  console.log('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||');
}// End resave_data_localStorage




/* -------------------------------      Check Connectivity        -------------------------------------  */
play_check_connectivity(route: ActivatedRoute , modalService: NgbModal , xComponent , methode_name: String , current_component : String  ){
   //   console.log(' play_check_connectivity xComponent ====> ');
  //    console.log(xComponent);

    let current_root = route+'' ;
/*
    route.url.subscribe(segments => {
        current_root = segments[0].path  ; 
        console.log('this.current_root => '+current_root);
    });
    */
    this.get_connection_state(current_root,current_component,methode_name,modalService,xComponent ) ;

 /*
if(this.return_bool == 0){
  this.open(xComponent.contentNotifOffline); // amza
}else if(this.return_bool == 1){
  this.open(xComponent.contentNotifOnline); // amza
}
*/


} // End play_check_connectivity




}
