import {Component, OnInit, ViewChild} from '@angular/core';
import { commandes } from './commandes';
import {CommandesService} from "./commandes.service";
import {HttpClient} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {consoleTestResultHandler} from "tslint/lib/test";
//import { Item } from './Item';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Http } from '@angular/http';
import { Routes } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import {Produits} from "../produits/Produits";
import {ToastData, ToastOptions} from "ng2-toasty";
import {ToastyService} from 'ng2-toasty';
import * as XLSX from 'xlsx';
import {products} from "./products";
import {plan} from "./plan";
import {ar} from "ngx-bootstrap/locale";
import {ProviderService} from "../provider/provider.service";
import * as $ from "jquery";
import { TemplateRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap';
import {Provider} from "../provider/Provider";
import {PaginationComponent} from "../pagination/pagination.component";



type AOA =any[][];

@Component({
    selector: 'app-commandes',
    templateUrl: './commandes.component.html',
    styleUrls: ['./commandes.component.scss']
})


export class CommandesComponent{

    @ViewChild(PaginationComponent)
    private paginationComponent: PaginationComponent;

    commandedata:any;
    produitdata:any;
    providerData: any;
    providerByCategorie: any;
    pageSize = 5;
    pageNumber = 1;
    closeResult: string;
    today=new Date();
    display='none';
    position = 'bottom-right';
    newPlan=" ";
    infoQuantite=" ";
    Enstock="";

    MiseEnStock:number;

    MovementId:number;
    myformupdate:FormGroup;
    myform: FormGroup;

    id:FormControl;
    Categorie:FormControl;
    RefCommande:FormControl;
    RefCommande1:FormControl;
    fournisseur:FormControl;
    PlanModele:FormControl;
    quantite:FormControl;
    DateArrivee:FormControl;
    BienID:FormControl;
    user_id: FormControl;
    files: FormControl;

    category_id:FormControl;
    plan:FormControl;
    date_arrived:FormControl;
    order_ref:FormControl;
    provider:FormControl;
    quantity:FormControl;


    Etat:FormControl;
    dataList : any[];
    refData: commandes[];
    modalRef: BsModalRef;
    // for products
    myformProducts: FormGroup;
    idProducts: FormControl;
    'imei_product': FormControl;
    'labelProducts': FormControl;
    'model': FormControl;
    'statusProducts': FormControl;
    'stateProducts': FormControl;
    'enabled_date': FormControl;
    'movement_id': FormControl;
    'observation': FormControl;
    'user_idProducts':FormControl;
    created_atProducts:FormControl;
    upload_at:FormControl;
    newplan:FormControl;
    ProductPost:any;
    recup:any;
    recup1:any;
    recup2:any;
    recup3:any;
    recup4:any;

    confirmQte:number;
    // modalRef: BsModalRef;

    plans:any;

    list:any=[];

    CommandePost :commandes;

    private headers = new Headers({'Content-Type': 'application/json'});
    ess1:any;

    // for edits

    ShowEditTable:boolean=false;
    EditRowId:any='';

    commandeUpdate: commandes;

    constructor(private commandeService: CommandesService,private ProviderService : ProviderService,private modalService: NgbModal,private bsmodalService: BsModalService,private _http: Http , private toastyService: ToastyService) {}


    ngOnInit() {

        this.getCommande();
        this.getProvider();
        this.createFormControls();
        this.createForm();
        this.createFormControlsUpdate();
        this.createFormUpdate();


        $('.table-filters input').on('input', function () {

            console.log('test');
            filterTable($(this).parents('table'));

        });

        function filterTable($table) {
            var $filters = $table.find('.table-filters th');
            var $rows = $table.find('.table-data');
            $rows.each(function (rowIndex) {
                var valid = true;
                $(this).find('td').each(function (colIndex) {
                    if ($filters.eq(colIndex).find('input').val()) {
                        if ($(this).html().toLowerCase().indexOf(
                            $filters.eq(colIndex).find('input').val().toLowerCase()) == -1) {
                            valid = valid && false;
                        }
                    }
                });
                if (valid === true) {
                    $(this).css('display', '');
                } else {
                    $(this).css('display', 'none');
                }
            });
        }
    }

    createFormUpdate() {
        this.myformupdate = new FormGroup({
            id:this.id,
            provider:this.provider,
            order_ref:this.order_ref,
            date_arrived:this.date_arrived,
            plan:this.plan,
            category_id:this.category_id,
            user_id:this.user_id,
            quantity:this.quantity,
            BienID:this.BienID,
            files:this.files,
        });
    }

    createFormControlsUpdate() {
        this.id = new FormControl('');
        this.category_id = new FormControl('');
        this.order_ref = new FormControl('');
        this.provider = new FormControl('');
        this.plan = new FormControl('');
        this.quantity = new FormControl('');
        this.date_arrived = new FormControl('');
        this.BienID = new FormControl('');
        this.user_id = new FormControl('');
        this.files=new FormControl('');
    }

    createFormControls() {
        this.id=new FormControl('');
        this.Categorie = new FormControl('', Validators.required);
        this.RefCommande = new FormControl('',Validators.required);
        this.RefCommande1 = new FormControl('',Validators.required);
        this.fournisseur = new FormControl('');
        this.PlanModele = new FormControl('');
        this.quantite = new FormControl('');
        this.DateArrivee = new FormControl('');
        this.Etat = new FormControl('');
        this.BienID = new FormControl('');
        this.user_id = new FormControl('');
        this.newplan = new FormControl('');
    }

    createForm() {

        this.myform = new FormGroup({
            id: this.id,
            Categorie:this.Categorie,
            RefCommande:this.RefCommande,
            RefCommande1:this.RefCommande1,
            fournisseur:this.fournisseur,
            PlanModele:this.PlanModele,
            quantite:this.quantite,
            DateArrivee:this.DateArrivee,
            Etat:this.Etat,
            BienID:this.BienID,
            user_id:this.user_id,
            newplan:this.newplan,
        } );
    }

    createFormControlsProducts() {
        this.imei_product = new FormControl('', Validators.required);
        this.labelProducts = new FormControl('');
        this.model = new FormControl('');
        this.statusProducts = new FormControl('');
        this.stateProducts = new FormControl('');
        this.enabled_date = new FormControl('');
        this.movement_id = new FormControl('');
        this.observation = new FormControl('');
        this.user_idProducts = new FormControl('');
        this.created_atProducts = new FormControl('');
        this.upload_at = new FormControl('');
    }

    createFormProducts() {

        this.myformProducts = new FormGroup({
            imei_product:this.imei_product,
            labelProducts:this.labelProducts,
            model:this.model,
            statusProducts:this.statusProducts,
            stateProducts:this.stateProducts,
            enabled_date:this.enabled_date,
            movement_id:this.movement_id,
            observation:this.observation,
            user_idProducts:this.user_idProducts,
            created_atProducts:this.created_atProducts,
            upload_at:this.upload_at,
            newplan:this.newplan,


        } );
    }

    getProvider() {

        this.ProviderService.getProvider().subscribe(provider => this.providerData=provider);

        console.log(this.providerData);
    }

    getCommande():void {

        this.commandeService.getcommande().subscribe(commande =>
        {
            console.log(commande);
            this.commandedata = commande;
        });
    }

    openModal(){
        this.display='block';

    }

    openEditModal(){
        console.log('voila');

    }

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

    onCloseHandled(){

        this.display='none';
    }

    addToast(options) {
        if (options.closeOther) {
            this.toastyService.clearAll();
        }
        this.position = options.position ? options.position : this.position;
        const toastOptions: ToastOptions = {
            title: options.title,
            msg: options.msg,
            showClose: options.showClose,
            timeout: options.timeout,
            theme: options.theme,
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added removed!');
            }
        };

        switch (options.type) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }

    resizepage(){

        this.pageSize= this.commandedata.length;

    }

    onFileChange(evt: any,categorie_id? :number) {
        /* wire up file reader */
        const target: DataTransfer = <DataTransfer>(evt.target);
        console.log(target);
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            /* read workbook */
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

            /* grab first sheet */
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];

            /* save data */
            this.ProductPost=[];
            this.ProductPost = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
            this.ProductPost.push(categorie_id);

            console.log(this.ProductPost);
        };
        reader.readAsBinaryString(target.files[0]);
    }

    addproduct(movementExcel : any) {
        this.commandeService.addProduct( this.recup4).subscribe(produitPostconsole=>{
                try {

                    console.log(produitPostconsole);

                    this.addToast({title:'', msg:'Le produit est ajouté à votre système', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});

                    setTimeout(() => {this.ngOnInit();}, 1000);


                }catch (e) {

                    console.log(e);
                    this.addToast({title:'', msg:'Produit n\'a pas pu être ajouter à votre système', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
                }
            }
        );
    }


    changecategorie(value) {
        this.commandeService.getPlan(value).subscribe(produit =>{

            this.produitdata = produit;

        });
        this.commandeService.getProviderByCategorie(value).subscribe(produit =>{

            this.providerByCategorie = produit;

        });
    }

    Newplan(event):boolean{
        console.log(event);
        if (event.target.checked) {
            $('#newplan').fadeIn('slow');

            $("#PlanModele").val("");
            $('#PlanModele').fadeOut('slow');

            this.newPlan='';
            return true;


        }
        else {
            $('#newplan').fadeOut('slow');

            $('#PlanModele').fadeIn('slow');
            return false;
        }
    }

    confirmerUpdtae(){
        this.commandeService.updateCommande(this.recup).subscribe(produitPostconsole=>{
                try {
                    var ee  = produitPostconsole.id;
                    console.log('reponse');

                    if(typeof produitPostconsole.id !='undefined'){
                        console.log('hello');
                        this.addToast({title:'', msg:'Produit est modifié à votre système', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});

                        setTimeout(() => {this.ngOnInit();}, 1000);
                    }
                    if ( this.recup3.files.length == 1){
                        console.log('ajout prooduit');
                        // this.MiseEnStock='EnStock';
                        const reader: FileReader = new FileReader();
                        // reader.onload = (e: any) => {
                        /* read workbook */
                        console.log('ajout prooduit3');

                        this.recup4.push(this.recup.date_arrived);
                        this.recup4.push(ee);
                        // console.log('seconde log');
                        // console.log(this.ProductPost);
                        console.log('superieur a la quantité saisie');
                        this.addproduct(this.recup4);
                        console.log( this.recup4);
                        //this.movementExcel=[];
                        // };
                        reader.readAsBinaryString(this.recup3.files[0]);
                    }

                }catch (e) {
                    this.addToast({title:'', msg:'Produit n\'a pas pu être supprimer à votre système', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});

                }
            }
        );
    }

    file_change(){
        $('#uplaod_div_file p').html('importation a été liée avec succées vous pouvez valider !!');
    }

    clicker():void{

        $('.file_loader').click();
    }

    confirmer() :number{
        console.log('test');
        console.log(this.recup);
        console.log(this.recup1);
        console.log(this.recup2);
        console.log(this.recup3);
        console.log(this.recup4);

        this.commandeService.addCommande(this.recup).subscribe(produitPostconsole=>{
                try {
                    var ee  = produitPostconsole.id;

                    if(typeof produitPostconsole.id !='undefined'){
                        this.addToast({title:'', msg:'Commande est ajoutée à votre système', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});

                        setTimeout(() => {this.ngOnInit();}, 1000);
                    }
                    if ( this.recup3.files.length == 1){
                        // this.MiseEnStock='EnStock';
                        const reader: FileReader = new FileReader();
                        // reader.onload = (e: any) => {
                        /* read workbook */

                        this.recup4.push(this.recup.date_arrived);
                        this.recup4.push(ee);
                        // console.log('seconde log');
                        // console.log(this.ProductPost);
                        console.log('supérieur a la quantité saisie');
                        this.addproduct(this.recup4);
                        console.log( this.recup4);
                        //this.movementExcel=[];
                        // };
                        reader.readAsBinaryString(this.recup3.files[0]);
                    }

                }catch (e) {
                    this.addToast({title:'', msg:'Commande n\'a pas pu être supprimer à votre système', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});

                }
            }
        );

        this.confirmQte=1;
        console.log(this.confirmQte);
        return this.confirmQte;

    }

    onSubmit(fm :NgForm,evt : any) {

        this.recup1=fm;
        this.recup2=evt;

        console.log(fm.value['PlanModele']);
        console.log(fm.value['fournisseur']);
        this.CommandePost = new commandes();
        this.CommandePost.category_id = this.myform.value['Categorie'] = fm.value['Categorie'];
        this.CommandePost.order_ref = this.myform.value['RefCommande'] = fm.value['RefCommande'];
        this.CommandePost.provider =this.myform.value['fournisseur'] = fm.value['fournisseur'];

        if (fm.value['newplan']) {

            $("#PlanModele").val("");
            this.CommandePost.plan = this.myform.value['PlanModele'] = fm.value['newplan'];

            this.plans= new plan();
            this.plans.plan_name = this.CommandePost.plan;
            this.plans.categorie_id = this.CommandePost.category_id;
            this.commandeService.addNewPlan(this.plans).subscribe(produitPostconsole=>{
                    try {
                        console.log(produitPostconsole);
                        if(typeof produitPostconsole =='undefined'){
                            this.addToast({title:'', msg:'Plan ajouté à votre système', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                        }

                    }catch (e) {

                        console.log(e);
                        this.addToast({title:'', msg:'Plan n\'a pas pu être supprimer à votre système', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
                    }
                }
            );
        }
        else{

            this.CommandePost.plan = this.myform.value['PlanModele'] = fm.value['PlanModele'];
        }

        this.CommandePost.quantity = this.myform.value['quantite'] = fm.value['quantite'];
        this.CommandePost.date_arrived = this.myform.value['DateArrivee'] = fm.value['DateArrivee'];
        this.CommandePost.observtion = ' En attente de stockage';
        this.CommandePost.BienID=this.myform.value['BienID']=2;
        this.CommandePost.user_id=this.myform.value['user_id']=2;

        const target: DataTransfer = <DataTransfer>(evt.target.files);
        this.recup3=target;

        if (target.files.length == 1) {

            // this.MiseEnStock='EnStock';
            this.CommandePost.observtion = 'Mise en stock';
            // this.MiseEnStock='EnStock';
            const reader: FileReader = new FileReader();
            reader.onload = (e: any) => {
                /* read workbook */
                const bstr: string = e.target.result;
                const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

                /* grab first sheet */
                const wsname: string = wb.SheetNames[0];
                const ws: XLSX.WorkSheet = wb.Sheets[wsname];

                /* save data */
                this.ProductPost=[];
                this.ProductPost = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
                this.recup4= this.ProductPost
                var c =   this.ProductPost.length;
                console.log('nombre de lignes');
                console.log(c);
                if( (c-1)<this.CommandePost.quantity){
                    this.infoQuantite='la quantité saisie: '+ this.CommandePost.quantity + ' est supérieure au nombre de produits dans le fichier :'+ (c-1)

                    $("#comp").click();

                }

                else if( (c-1)>this.CommandePost.quantity){
                    this.infoQuantite='la quantité saisie: '+ this.CommandePost.quantity + ' est inférieur au nombre de produits'+ (c-1)
                    $("#comp").click();


                }

                else{
                    this.commandeService.addCommande(this.CommandePost).subscribe(produitPostconsole=>{
                            try {console.log('interrr');
                                var ee  = produitPostconsole.id;
                                console.log('reponse');

                                if(typeof produitPostconsole.id !='undefined'){
                                    console.log('hello');
                                    this.addToast({title:'', msg:'Commande ajouté à votre système', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                                    fm.reset();
                                    setTimeout(() => {this.ngOnInit();}, 1000);
                                }
                                if (target.files.length == 1){
                                    // this.MiseEnStock='EnStock';
                                    const reader: FileReader = new FileReader();
                                    reader.onload = (e: any) => {
                                        /* read workbook */
                                        this.ProductPost.push(this.CommandePost.date_arrived);
                                        this.ProductPost.push(ee);
                                        // console.log('seconde log');
                                        // console.log(this.ProductPost);
                                        console.log('superieur a la quantité saisie');
                                        this.addproduct(this.ProductPost);
                                        //this.movementExcel=[];
                                    };
                                    reader.readAsBinaryString(target.files[0]);
                                }

                            }catch (e) {
                                this.addToast({title:'', msg:'Commande n\'a pas pu être supprimer à votre système', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});

                            }

                        }
                    );
                }


                //this.movementExcel=[];
            };
            reader.readAsBinaryString(target.files[0]);

        }

        else{

            console.log('tchaditi hay');

            this.commandeService.addCommande(this.CommandePost).subscribe(produitPostconsole=>{
                    try {
                        var ee  = produitPostconsole.id;
                        console.log('reponse');

                        if(typeof produitPostconsole.id !='undefined'){
                            console.log('hello');
                            this.addToast({title:'', msg:'Commande ajoutée à votre système', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                            fm.reset();
                            setTimeout(() => {this.ngOnInit();}, 1000);
                        }

                    }catch (e) {
                        this.addToast({title:'', msg:'Commande n\'a pas pu être supprimer à votre système', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});

                    }
                }
            );

        }
        console.log( this.CommandePost );
        this.recup=this.CommandePost;
    }

    Edit(val){
        this.EditRowId=val;
        document.getElementById('import1').style.cssText=' display=true';
        document.getElementById('import2').style.cssText=' display=true';
        //document.getElementById('import11').style.cssText=' display=true';
        //document.getElementById('import12').style.cssText=' display=true';
    }

    addproductOnUpdate(movementExcel : any) {
        this.commandeService.addProduct( this.ProductPost).subscribe(produitPostconsole=>{
                try {
                    if(typeof produitPostconsole.imei_product=='undefined'){

                        this.addToast({title:'', msg:'Produit ajouté à votre système', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                        this.myform.reset();
                        setTimeout(() => {this.ngOnInit();}, 1000);
                    }

                }catch (e) {

                    console.log(e);
                    // this.addToast({title:'notifications Waiting your Produit', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                }
            }
        );
    }

    updateCommandes(id,provider,order_ref,date_arrived,plan,category_id,quantity,BienID,user_id,evt){

        // this.recup1=f;
        // this.recup2=evt;
        console.log(evt);
        this.commandeUpdate=new commandes();
        // console.log( f.value );

        console.log( this.providerData);
       // var provider = this.providerData
       //  for (var i=0;i<provider.length;i++) {
       //      var opt=new Option();
       //      opt.text=provider[i].name;
       //      opt.value=provider[i].id;
       //      opt.title=provider[i].id;
       //      if(provider == provider[i].id)
       //      {
       //          console.log(provider[i].id);
       //          $("#fournisseur")
       //              .append('<option selected value="'+provider[i].id+'">'+provider[i].name+'</option>');
       //      }
       //      else  $("#fournisseur")
       //          .append(opt);
       //
       //  }


        this.commandeUpdate.id = id;
        this.commandeUpdate.provider = this.myformupdate.value['provider'] ? this.myformupdate.value['provider']:provider;
        this.commandeUpdate.order_ref = this.myformupdate.value['order_ref'] ? this.myformupdate.value['order_ref']:order_ref;
        this.commandeUpdate.date_arrived =this.myformupdate.value['date_arrived'] ? this.myformupdate.value['date_arrived']:date_arrived;
        this.commandeUpdate.plan = this.myformupdate.value['plan'] ? this.myformupdate.value['plan']:plan;
        this.commandeUpdate.category_id = this.myformupdate.value['category_id'] ? this.myformupdate.value['category_id']:category_id ;
        this.commandeUpdate.quantity = this.myformupdate.value['quantity'] ? this.myformupdate.value['quantity']:quantity;
        this.commandeUpdate.BienID = this.myformupdate.value['BienID'] ? this.myformupdate.value['BienID']:BienID;
        this.commandeUpdate.user_id = this.myformupdate.value['user_id'] ? this.myformupdate.value['user_id']:user_id;
        const target: DataTransfer = <DataTransfer>(evt.target.files);
        this.recup3=target;


        if (target.files.length == 1) {

            // this.MiseEnStock='EnStock';
            this.commandeUpdate.observtion = 'Mise en stock';
            // this.MiseEnStock='EnStock';
            const reader: FileReader = new FileReader();
            reader.onload = (e: any) => {
                /* read workbook */
                const bstr: string = e.target.result;
                const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

                /* grab first sheet */
                const wsname: string = wb.SheetNames[0];
                const ws: XLSX.WorkSheet = wb.Sheets[wsname];

                /* save data */
                this.ProductPost=[];
                this.ProductPost = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
                this.recup4= this.ProductPost
                var c =   this.ProductPost.length;
                console.log('nombre de lignes');
                console.log(c);
                if( (c-1)<this.commandeUpdate.quantity){
                    this.infoQuantite='la quantité saisie: '+ this.commandeUpdate.quantity + ' est supérieure au nombre de produits dans le fichier :'+ (c-1)

                    $("#compUpdate").click();

                }

                else if( (c-1)>this.commandeUpdate.quantity){
                    this.infoQuantite='la quantité saisie: '+ this.commandeUpdate.quantity + ' est inférieur au nombre de produits'+ (c-1)
                    $("#compUpdate").click();


                }

                else{
                    this.commandeService.updateCommande(this.commandeUpdate).subscribe(produitPostconsole=>{
                            try
                            {
                                console.log('interrr');
                                var ee  = produitPostconsole.id;
                                console.log('reponse update');

                                if(typeof produitPostconsole.id !='undefined'){
                                    console.log('hello');
                                    this.addToast({title:'', msg:'Commande modifiée à votre système', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                                    this.myformupdate.reset();
                                    setTimeout(() => {this.ngOnInit();}, 1000);
                                }
                                if (target.files.length == 1){
                                    // this.MiseEnStock='EnStock';
                                    const reader: FileReader = new FileReader();
                                    reader.onload = (e: any) => {
                                        /* read workbook */
                                        this.ProductPost.push(this.commandeUpdate.date_arrived);
                                        this.ProductPost.push(ee);
                                        // console.log('seconde log');
                                        // console.log(this.ProductPost);
                                        console.log('supérieur à la quantité saisie');
                                        this.addproduct(this.ProductPost);
                                        //this.movementExcel=[];
                                    };
                                    reader.readAsBinaryString(target.files[0]);
                                }
                            }
                            catch (e)
                            {
                                this.addToast({title:'', msg:'Commande n\' a pas pu être modifier à votre système', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                            }
                        }
                    );
                }
                //this.movementExcel=[];
            };
            reader.readAsBinaryString(target.files[0]);

        }

        else{
            this.commandeService.updateCommande( this.commandeUpdate ).subscribe(produitPostconsole=>{
                    try {

                        console.log(produitPostconsole.id);
                        if(typeof produitPostconsole!='undefined'){
                            this.addToast({title:'', msg:'Commande modifiée à votre système', timeout: 1000, theme:'bootstrap', position:'top-right', type:'success'});
                            // document.getElementById("import1").style.display = "none";
                            // document.getElementById("import2").style.display = "none";
                            setTimeout(() => {this.ngOnInit();}, 1000);
                        }

                    }catch (e) {

                        this.addToast({title:'', msg:'Commande n\' a pas pu être modifier à votre système', timeout: 1000, theme:'bootstrap', position:'top-right', type:'error'});
                    }
                }
            );
        }
        console.log( this.commandeUpdate);
        this.recup=this.commandeUpdate;
    }

    openadd( content1){
        this.open(content1);



    }

    openVerif( content){
        this.open(content);
    }

    opensm(val,content1,content2) {
        // this.modalService.open(content, { }).result.then((result) => {
        //     this.closeResult = `Closed with: ${result}`;
        // }, (reason) => {
        //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        // });
        if(val=='Mise en stock'){
            this.open(content2);
        }
        else {this.open(content1); }


    }

    openup(val,content1,content2) {

        console.log(val);


        if(val=='Mise en stock'){
            this.open(content2);
        }
        else {this.open(content1); }

    }

    pageChanged(pN: number): void {

        console.log(pN);
        this.pageNumber = pN;
    }

    delete(commande:commandes):void{

        this.addToast({title:'', msg:'Votre commande est en cours'+ commande.order_ref, timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
        this.commandeService.deleteCommande(commande).subscribe(produitPostconsole=>{

            try {
                console.log(produitPostconsole);
                if(typeof produitPostconsole !='undefined'){
                    this.addToast({title:'', msg:'Votre commande est supprimée', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                    this.myform.reset();
                    setTimeout(() => {this.ngOnInit();}, 1000);
                }
            }catch (e) {

                console.log(e);
                this.addToast({title:'', msg:'Votre commande n\'a pas pu être supprimé', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
            }
        });
        setTimeout(() => {this.ngOnInit();}, 1000);
    }


    function( ){

        // document.getElementById('inpsearch').style.cssText=' readonly=false; ';


    }
}

