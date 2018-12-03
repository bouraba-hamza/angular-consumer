import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {products} from "../../commandes/products";
import {ToastData, ToastOptions, ToastyService} from "ng2-toasty";
//import {ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ReactiveFormsModule, FormsModule, FormBuilder} from '@angular/forms';
import {Produits} from "../../produits/Produits";
import {commandes} from "../../commandes/commandes";
import {ProviderService} from "../../provider/provider.service";
import {InstallerService} from "../../installer/installer.service";
import {CommandesService} from "../../commandes/commandes.service";
import * as $ from "jquery";
import {CartesimService} from "./cartesim.service";
import {PaginationComponent} from "../../pagination/pagination.component";

@Component({
  selector: 'app-cartesim',
  templateUrl: './cartesim.component.html',
  styleUrls: ['./cartesim.component.scss']
})
export class CartesimComponent implements OnInit {

    @ViewChild(PaginationComponent)
    private paginationComponent: PaginationComponent;


    productdata: products[];
    display='none';
    position = 'bottom-right';
    closeResult: string;
    today=new Date();
//resize()
    pageSize = 5;
    pageNumber = 1;
    result = " ";
    modele = " ";
    labelform = " ";
    labelformUpdate = " ";
    labelLigne = " ";
    TypeCategorie :number;
    EnblaedDisabled=" ";

    InterventionType:number;

    autre_ref='autre';

    //essy:products;

    myform: FormGroup;
    id: FormControl;
    imei_product: FormControl;
    label: FormControl;
    model: FormControl;
    categorie_id: FormControl;
    status: FormControl;
    state: FormControl;
    enabled_date: FormControl;
    personal_id: FormControl;
    observation: FormControl;
    productpush: FormControl;
    provider: FormControl;
    order_ref:FormControl;
    install:FormControl;
    refData: commandes[];
    productPost: products;
    produtcUpdate: products;
    providerData: any;
    myformUpdate: FormGroup;
    dataProductInstaller:any;



    affectOk:number;

    installers:any;
    com: commandes;

    iDautre:number;


    produitdata:any;



    ShowEditTable:boolean=false;
    EditRowId:any='';


    constructor( private productsService :CartesimService,private ProviderService : ProviderService,private installerService : InstallerService,private CommandesService :CommandesService,private modalService: NgbModal,private http: HttpClient,private toastyService: ToastyService) { }


  ngOnInit() {

    this.getproductSim();

      this.createFormControls();
      this.createForm();

      this.EnblaedDisabled='enabled';

      $('.table-filters input').on('input', function () {


          filterTable($(this).parents('table'));

      });

      $("#import2").on( "keypress", function(event) {
          console.log('test');
          if (event.which == 13 && !event.shiftKey) {
              event.preventDefault();
              $("#form6").submit();
          }
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
      this.getProvider();
      this.getInstaller();


  }



    entrerpress(event : any) {

        console.log('test');
        // if (e.keyCode == 13) {
        //     e.preventDefault();
        //     return false;
        // }

    }

    createFormControls() {
        this.id = new FormControl('');
        this.imei_product = new FormControl('', Validators.required);
        this.productpush = new FormControl('');
        this.label = new FormControl('');
        this.status = new FormControl('', Validators.required);
        this.state = new FormControl('');
        this.provider = new FormControl('');
        this.order_ref = new FormControl('');
        this.enabled_date = new FormControl('');
        this.personal_id = new FormControl('');
        this.observation =  new FormControl('');
        this.install =  new FormControl('');

        // this.quantite = new FormControl('');
        // this.DateArrivee = new FormControl('');
        // this.Etat = new FormControl('');
        // this.BienID = new FormControl('');
        // this.user_id = new FormControl('');
    }

    createForm(){


        this.myform = new FormGroup({
            id: this.id,
            imei_product:this.imei_product,
            label:this.label,
            status:this.status,
            productpush:this.productpush,
            state:this.state,
            provider : this.provider,
            order_ref :this.order_ref,
            enabled_date :   this.enabled_date,
            personal_id :   this.personal_id,
            observation :   this.observation,
            install :   this.install
            // PlanModele:this.PlanModele,
            // quantite:this.quantite,
            // DateArrivee:this.DateArrivee,
            // Etat:this.Etat,
            // BienID:this.BienID,
            // user_id:this.user_id,
        })
    }

    getCommande(value) {

        this.productsService.getCommande(value).subscribe(commandes => this.refData=commandes);

        console.log('data');
        console.log(this.refData);
    }

    getProductInstallerSim(id):void{

        this.productsService.getProductInstallerSim(id).subscribe(productInsallt => this.dataProductInstaller=productInsallt);

        console.log('dataProductInstaller');
        console.log(this.dataProductInstaller);
    }

    getProductStockSim(id):void{

        this.productsService.getProductStockSim(id).subscribe(productInsallt => this.dataProductInstaller=productInsallt);

        console.log('dataProductInstaller');
        console.log(this.dataProductInstaller);
    }
    getProductStockBoitier(id):void{

        this.productsService.getProductStockBoitier(id).subscribe(productInsallt => this.dataProductInstaller=productInsallt);

        console.log('dataProductInstaller');
        console.log(this.dataProductInstaller);
    }

    getProductInstallerBoitier(id):void{

        this.productsService.getProductInstallerBoitier(id).subscribe(productInsallt => this.dataProductInstaller=productInsallt);

        console.log('dataProductInstaller');
        console.log(this.dataProductInstaller);
    }

    getproductSim():void{

        this.productsService.getproductSim().subscribe(product => {
            this.productdata = product

            console.log(this.productdata);

        });

        this.result='SSID';
        this.modele='Plan';
        this.labelLigne='ligne';
        this.labelform='Ajout manuel des cartes sim';
        this.labelformUpdate ='Modifier cartes sim';
        this.TypeCategorie=2;
        this.iDautre=141;
        document.getElementById('liste').style.cssText='display=true';

        document.getElementById('liste2').style.cssText='display=true';
        this.changecategorie(this.TypeCategorie);
        this.getCommande(this.TypeCategorie );







    }

    getInstaller() {
        this.installerService.getInstaller().subscribe(installer => this.installers=installer);
    }

    getProvider() {


        this.ProviderService.getProvider().subscribe(provider => this.providerData=provider);
        console.log( this.providerData)

    }

    onSubmit( f:NgForm){

        this.productPost=  new products();

        this.productPost.imei_product= f.value['imei_product'] ;
        this.productPost.label= f.value['label'];
        this.productPost.model=f.value['model'];
        this.productPost.enabled_date=f.value['DateArrivee'];
        this.productPost.status=f.value['status']='1';
        this.productPost.state=f.value['state']='disabled';
        this.productPost.movement_id=this.iDautre;
        // this.productPost.movement_id=f.value['ref_commande'];
        console.log(f.value['ref_commande']);
        console.log(this.productPost);

        this.productsService.addSimBoitier( this.productPost ).subscribe(produitPostconsole=>{
                try {
                    if(typeof produitPostconsole!='undefined'){

                        this.addToast({title:'', msg:'Produit ajouté dans votre système', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                        f.reset();
                        setTimeout(() => {this.getproductSim();this.ngOnInit();}, 1000);
                    }

                }catch (e) {

                    console.log(e);
                    this.addToast({title:'', msg:'Produit n\'est pas ajouté dans votre système', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
                }
            }
        );
    }

    opensm(content,status, msg) {

        console.log('stats')
        console.log(status)
        if(status!=0 ){

            this.open(content)
        }
        else{
            this.open(msg);
        }
    }

    openAffectation(content) {
        let tabEnable = [];
        let tab = [];

        $('#listetable tbody').find('input[type="checkbox"]:checked').each(function () {


            console.log($(this).val());
            tab.push($(this).val());


        });
        console.log(tab);



        this.modalService.open(content, { }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

        console.log(tab.toString());

        $("#productpush1").val(tab.toString());


    }

    openActivation(content){
        this.modalService.open(content, { }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });



    }

    ValiderActivation( f:NgForm){

        console.log(f.value);
        this.produtcUpdate=  new products();
        this.produtcUpdate.NbrActiv=f.value['nombre'];
        this.produtcUpdate.update_at=f.value['DateActivation'];
        console.log( this.produtcUpdate);


        this.productsService.activer( this.produtcUpdate ).subscribe(produitPostconsole=>{
                try {
                    console.log(produitPostconsole);
                    this.addToast({title:'', msg:'Votre produit est validé', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                    console.log('test2');
                    // document.getElementById("import2").style.display = "none";
                    // console.log('test3');

                    setTimeout(() => {this.ngOnInit(); this.getproductSim();}, 1000);
                }catch (e) {

                    // this.addToast({title:'error', msg:'we don\'t know wht happen', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                }
            }
        );


    }


    Edit(val){
        this.EditRowId=val;
        // document.getElementById('import1').style.cssText=' display=true';
        document.getElementById('import2').style.cssText=' display=true';
        //document.getElementById('import11').style.cssText=' display=true';
        //document.getElementById('import12').style.cssText=' display=true';
    }

    changecategorie(value)
    {
        this.productsService.getPlan(value).subscribe(produit =>{

            this.produitdata = produit;

        });

    }



    openModal(){
        this.display='block';

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

    resizepage(){

        this.pageSize= this.productdata.length;

    }


    pageChanged(pN: number): void {

        console.log(pN);
        this.pageNumber = pN;
    }


    onCloseHandled(){


        this.display='none';


    }

    openc( c1,c2,c3,c4){
        console.log(c4);
        console.log('ideeee');
        console.log(c2);
        console.log(c3);
        console.log(c4);
        if( c3==2){
            if( c4==0){
                this.getProductInstallerSim(c2);

            }

            else {

                this.getProductStockSim(c2);
            }

        }
        else if( c3==1){
            if( c4==0){
                this.getProductInstallerBoitier(c2);
            }

            else {

                this.getProductStockBoitier(c2);
            }



        }


        this.open(c1);
    }

    onUpdate( f:NgForm,id){
        console.log('looolllaaa');

        console.log(f.value);



        this.produtcUpdate=new products();
        this.produtcUpdate.id=id;
        console.log(this.produtcUpdate.id);

        this.produtcUpdate.imei_product = f.value['imei_product'];
        //   console.log(   this.commandeUpdate.category_id);
        this.produtcUpdate.label = f.value['label'];
        this.produtcUpdate.model = f.value['model'];
        this.produtcUpdate.order_ref=f.value['order_ref'];

        console.log('onupdate');
        console.log(this.produtcUpdate);
        this.productsService.updateProduct( this.produtcUpdate ).subscribe(produitPostconsole=>{
                try {
                    console.log('rep');
                    console.log(produitPostconsole);

                    this.addToast({title:'', msg:'Produit modifé dans votre système', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});

                    setTimeout(() => {this.ngOnInit();this.getproductSim();}, 1000);

                }catch (e) {

                    this.addToast({title:'', msg:'Produit n\'est pas modifié dans votre système', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
                }



            }
        );




    }

    delete(product:products):void{

        this.addToast({title:'', msg:'En cours '+ product.order_ref, timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
        this.productsService.deleteProduct(product).subscribe(produitPostconsole=>{
            console.log(produitPostconsole);
            try {
                if(produitPostconsole){
                    this.addToast({title:'', msg:'Votre produit a été bien supprimé', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                    this.myform.reset();
                    setTimeout(() => {this.getproductSim();this.ngOnInit();}, 1000);
                }

            }catch (e) {

                console.log(e);
                this.addToast({title:'', msg:'Votre produit ne peut pas être supprimer', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
            }
        });
    }

    ValiderAffectation(f:NgForm){
        console.log('form');
        console.log(f.value);
        let productpush= $("#productpush1").val();
        console.log(productpush);
        this.produtcUpdate=new products();
        var e=productpush.toString();

        this.produtcUpdate.productpush=e;
        this.produtcUpdate.personal_id=f.value['personal_id'];
        this.produtcUpdate.observation=f.value['observation'];
        this.produtcUpdate.status='2';
        console.log(this.produtcUpdate);




        this.productsService.affecter( this.produtcUpdate ).subscribe(produitPostconsole=>{
                try {
                    console.log(produitPostconsole);
                    this.addToast({title:'', msg:'Affectation réussite', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                    console.log('test2');
                    // document.getElementById("import2").style.display = "none";
                    // console.log('test3');

                    setTimeout(() => {this.ngOnInit(); this.getproductSim();}, 1000);
                }catch (e) {
                    // this.addToast({title:'error', msg:'we don\'t know wht happen', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                }
            }
        );
    }

    d(test)
    {
        console.log('test')
    }

    openBlocage(content){

        let tab = [];
        $('#listetable tbody').find('input[type="checkbox"]:checked').each(function () {


            console.log($(this).val());
            tab.push($(this).val());


        });


        console.log(tab);



        this.modalService.open(content, { }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

        console.log(tab.toString());

        $("#productpush2").val(tab.toString());

    }

    Validerblocage(f:NgForm){

        let productpush= $("#productpush2").val();

        console.log('voilaaaa');

        this.produtcUpdate=new products();
        var e=productpush.toString();

        this.produtcUpdate.status='3';
        console.log(e);

        this.produtcUpdate.productpush=e;

        this.productsService.bloquer( this.produtcUpdate ).subscribe(produitPostconsole=>{
                try {

                    this.addToast({title:'', msg:'Vous l\'avez bien bloqué', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});


                    // document.getElementById("import2").style.display = "none";
                    // console.log('test3');
                    // this.EditRowId='';
                    // f.reset();
                    setTimeout(() => {this.ngOnInit();this.getproductSim()}, 1000);

                }catch (e) {

                    this.addToast({title:'', msg:'Erreur dans le blockage', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
                }


            }
        );


    }

    openRetour(content){

        let tab = [];
        $('#listetable tbody').find('input[type="checkbox"]:checked').each(function () {


            console.log($(this).val());
            tab.push($(this).val());


        });


        console.log(tab);



        this.modalService.open(content, { }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

        console.log(tab.toString());

        $("#productpushret").val(tab.toString());

    }

    Validerretour(f:NgForm) {
        console.log(f.value);

        let productpush = $("#productpushret").val();

        console.log('voilaaaa');

        this.produtcUpdate = new products();
        var e = productpush.toString();

        this.produtcUpdate.status = '1';
        console.log(e);

        this.produtcUpdate.productpush = e;
        console.log(this.produtcUpdate);
        this.productsService.retourner( this.produtcUpdate ).subscribe(produitPostconsole=>{
                try {

                    this.addToast({title:'', msg:'Retour validé', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});

                    setTimeout(() => {this.ngOnInit();this.getproductSim()}, 1000);

                }catch (e) {

                    this.addToast({title:'', msg:'Retour n\'est pas bien validé', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
                }


            }
        );

    }

    openLiberation(content){

        let tab = [];
        $('#listetable tbody').find('input[type="checkbox"]:checked').each(function () {


            console.log($(this).val());
            tab.push($(this).val());


        });


        console.log(tab);



        this.modalService.open(content, { }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

        console.log(tab.toString());

        $("#productpushLiberation").val(tab.toString());

    }

    ValiderLiberation(f:NgForm){

        let productpush= $("#productpushLiberation").val();

        console.log('voilaaaa');
        console.log(productpush);

        this.produtcUpdate=new products();
        var e = productpush.toString();

        this.produtcUpdate.status='0';
        console.log(e);

        this.produtcUpdate.productpush=e;

        this.productsService.liberer( this.produtcUpdate ).subscribe(produitPostconsole=>{
                try {

                    this.addToast({title:'', msg:'Produit bien liberé', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});

                    setTimeout(() => {this.ngOnInit();this.getproductSim()}, 1000);

                }catch (e) {

                    this.addToast({title:'', msg:'Produit n\'est pas bien liberé', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
                }


            }
        );


    }
    openTransfert(content){
        let tab = [];

        $('#listetable tbody').find('input[type="checkbox"]:checked').each(function () {


            console.log($(this).val());
            tab.push($(this).val());


        });
        console.log(tab);



        this.modalService.open(content, { }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

        console.log(tab.toString());

        $("#productpushtransf").val(tab.toString());
        console.log($("#productpushtransf").val(tab.toString()) );
    }

    ValiderTransfert(f:NgForm){

        console.log('pour transfert');
        console.log(f.value);

        let productpush= $("#productpushtransf").val();

        console.log('voilaaaa');
        console.log(productpush);

        this.produtcUpdate=new products();
        var e=productpush.toString();

        this.produtcUpdate.productpush=e;
        this.produtcUpdate.personal_id=f.value['personal_id'];

        this.produtcUpdate.status='2';
        console.log(this.produtcUpdate);
        this.productsService.tranferer( this.produtcUpdate ).subscribe(produitPostconsole=>{
                try {

                    this.addToast({title:'', msg:'Produit bien transféré', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});

                    setTimeout(() => {this.ngOnInit();this.getproductSim()}, 1000);

                }catch (e) {

                    this.addToast({title:'', msg:'Produit n\'est pas bien transféré', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
                }


            }
        );

    }

    transf(f:NgForm){

        console.log(f.value);
    }

    openDeblocage(content){
        let tab = [];
        $('#listetable tbody').find('input[type="checkbox"]:checked').each(function () {


            console.log($(this).val());
            tab.push($(this).val());


        });
        console.log(tab);



        this.modalService.open(content, { }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

        console.log(tab.toString());

        $("#productpush3").val(tab.toString());
    }

    Validerdeblocage(f:NgForm){

        let productpush= $("#productpush3").val();

        console.log('voilaaaa');

        this.produtcUpdate=new products();
        var e=productpush.toString();

        this.produtcUpdate.status='1';
        console.log(e);

        this.produtcUpdate.productpush=e;

        this.productsService.debloquer( this.produtcUpdate ).subscribe(produitPostconsole=>{
                try {

                    this.addToast({title:'', msg:'Produit bien débloqué', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});


                    setTimeout(() => {this.ngOnInit();this.getproductSim()}, 1000);
                }catch (e) {

                    this.addToast({title:'', msg:'Produit n\'est pas bien débloqué', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
                }


            }
        );

    }

    Activation( f:NgForm){

        let tab = [];
        $('#listetable tbody').find('input[type="checkbox"]:checked').each(function () {

            tab.push($(this).val());
        });

        $("#productpush4").val(tab.toString());

        console.log('hahahhahaha');
        let productpush= $("#productpush4").val();
        console.log('voilaaaa');
        this.produtcUpdate=new products();
        var e=productpush.toString();
        console.log(e);
        this.produtcUpdate.productpush=e;

        this.produtcUpdate.state='enabled';
        console.log(this.produtcUpdate.state);

        this.productsService.activer( this.produtcUpdate ).subscribe(produitPostconsole=>{
                try {

                    this.addToast({title:'', msg:'Produit bien activé', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});


                    setTimeout(() => {this.getproductSim();}, 1000);
                }catch (e) {

                    this.addToast({title:'', msg:'Produit n\'est pas bien activé', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
                }

            }
        );
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




}
