///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ɵEMPTY_ARRAY} from '@angular/core';
import {Provider} from "./provider";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TypesProvider} from "../typesprovider/TypesProvider";
import {ProviderService} from "./provider.service";
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';

import * as $ from 'jquery';
import {PaginationComponent} from "../pagination/pagination.component";



@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent {

    @ViewChild(PaginationComponent)
    private paginationComponent: PaginationComponent;

  /* pagination Info */
  pageSize = 5;
  pageNumber = 1;

  providerData:any;
  provider: Provider[];
  providerPost : Provider;
  typesprovider: TypesProvider[];

  title = 'app';
  position = 'bottom-right';
  msg: string;
  showClose = true;
  res :any;
  timeout = 5000;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  myform: FormGroup;
  myformUpdate: FormGroup;

  id:FormControl;
  name:FormControl;
  contact_gsm:FormControl;
  types_providers_id:FormControl;
  tel_fix:FormControl;
  mail:FormControl ;
  city:FormControl;
  departement:FormControl;
  code_postal:FormControl;
  region:FormControl;
  address:FormControl;


  rowData: any;
  rowDatas: Observable<any>;

  closeResult: string;


  constructor(private providerService: ProviderService,private http: HttpClient,private modalService: NgbModal,private toastyService: ToastyService) {

  }

  getTypesProvider(): void {
    this.providerService.getTypesProvider()
      .subscribe(typesprovider => this.typesprovider = typesprovider);
  }

  resizepage(){

    this.pageSize= this.providerData.length;

  }

  ngOnInit() {

    this.createFormControls();
    this.createForm();
    this.createFormControlsUpdate();
    this.createFormUpdate();

    this.getProvider();

    this.getTypesProvider();
    $('.table-filters input').on('input', function () {


      filterTable($(this).parents('table'));

    });

    $('#client_select').on('change', function () {


      filterTable_select($(this).parents('table'));

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



    function filterTable_select($table) {
      var $filters = $table.find('.table-filters th');
      var $rows = $table.find('.table-data');
      $rows.each(function (rowIndex) {
        var valid = true;
        $(this).find('td').each(function (colIndex) {
          if ($filters.eq(colIndex).find('select').val()) {
            if ($(this).html().toLowerCase().indexOf(
              $filters.eq(colIndex).find('select').val().toLowerCase()) == -1) {
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

  getProvider():void{
    this.providerService.getProvider().subscribe(provider => this.providerData=provider);

    console.log(this.providerData);
  }

  pageChanged(pN: number): void {

    this.pageNumber = pN;
  }

  createFormControls() {
    this.name = new FormControl('');
    this.contact_gsm = new FormControl('');
    this.types_providers_id = new FormControl('');
    this.tel_fix = new FormControl('');
    this.mail = new FormControl([null, [Validators.required, Validators.email]]);
    this.city = new FormControl('');
    this.departement = new FormControl('');
    this.code_postal = new FormControl('');
    this.region = new FormControl('');
    this.address = new FormControl('');


  }

  createFormControlsUpdate() {
    this.id = new FormControl('');
    this.name = new FormControl('');
    this.contact_gsm = new FormControl('');
    this.types_providers_id = new FormControl('');
    this.tel_fix = new FormControl('');
    this.mail = new FormControl('');
    this.city = new FormControl('');
    this.departement = new FormControl('');
    this.code_postal = new FormControl('');
    this.region = new FormControl('');
    this.address = new FormControl('');

  }

  createForm() {
    this.myform = new FormGroup({
      name:this.name,
      contact_gsm:this.contact_gsm,
      types_providers_id:this.types_providers_id,
      tel_fix:this.tel_fix,
      mail:this.mail,
      city:this.city,
      departement:this.departement,
      code_postal:this.code_postal,
      region:this.region,
      address:this.address,
    });
  }

  createFormUpdate() {
    this.myformUpdate = new FormGroup({
      id:this.id,
      name:this.name,
      contact_gsm:this.contact_gsm,
      types_providers_id:this.types_providers_id,
      tel_fix:this.tel_fix,
      mail:this.mail,
      city:this.city,
      departement:this.departement,
      code_postal:this.code_postal,
      region:this.region,
      address:this.address,
    });
  }

  open(content) {
    this.modalService.open(content, {size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  opensm(content) {
    this.modalService.open(content, { }).result.then((result) => {
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

  onSubmit() {

if (this.myform.valid)
    {
        this.providerPost=  new Provider();
        this.providerPost.name = this.myform.value['name'];
        this.providerPost.contact_gsm = this.myform.value['contact_gsm'];
        this.providerPost.types_providers_id = this.myform.value['types_providers_id'];
        this.providerPost.tel_fix = this.myform.value['tel_fix'];
        this.providerPost.mail =this.myform.value['mail'];
        this.providerPost.city = this.myform.value['city'];
        this.providerPost.departement = this.myform.value['departement'];
        this.providerPost.code_postal = this.myform.value['code_postal'];
        this.providerPost.region = this.myform.value['region'];
        this.providerPost.address=this.myform.value['address'];

        this.providerService.addProvider( this.providerPost ).subscribe(providerPostconsole=>{
                try {
                    if(typeof providerPostconsole.name!='undefined'){

                        this.addToast({title:'', msg:'Fournisseur ajouté avec succès', timeout: 1000, theme:'bootstrap', position:'top-right', type:'success'});
                        this.myform.reset();
                        setTimeout(() => {this.ngOnInit();}, 1000);
                    }

                }catch (e) {

                    console.log(e);
                    this.addToast({title:'', msg:'Erreur dans l\'ajout du fournisseur', timeout: 1000, theme:'bootstrap', position:'top-right', type:'error'});
                }

            }
        );


    }

    else{

  if(this.myform.get('mail')['_status'] =="INVALID")
    {
        this.addToast({title:'Email', msg:'l\'email n\'est pas valide', timeout: 1000, theme:'bootstrap', position:'top-right', type:'error'});

    }
  if(this.myform.get('name')['_status'] =="INVALID")
    {
        this.addToast({title:'Nom', msg:'Nom Obligatoire', timeout: 1000, theme:'bootstrap', position:'top-right', type:'error'});

    }
  if(this.myform.get('contact_gsm')['_status'] =="INVALID")
    {
        this.addToast({title:'Contact_GSM', msg:'Contact GSM Obligatoire', timeout: 1000, theme:'bootstrap', position:'top-right', type:'error'});

    }
  if(this.myform.get('types_providers_id')['_status'] =="INVALID")
    {
        this.addToast({title:'Type', msg:'Veuillez choisir un type', timeout: 1000, theme:'bootstrap', position:'top-right', type:'error'});

    }

  }


    }

  onUpdate(id,name,contact_gsm,types_providers_id,tel_fix,mail,city,departement,code_postal,region,address){


    if (this.myformUpdate.valid) {
      this.providerPost=  new Provider();
      this.providerPost.id = id;
      this.providerPost.name = this.myformUpdate.value['name'] ? this.myformUpdate.value['name']:name;
      this.providerPost.contact_gsm = this.myformUpdate.value['contact_gsm'] ? this.myformUpdate.value['contact_gsm']:contact_gsm;
      this.providerPost.types_providers_id = this.myformUpdate.value['types_providers_id'] ? this.myformUpdate.value['types_providers_id']:types_providers_id;
      this.providerPost.tel_fix = this.myformUpdate.value['tel_fix'] ? this.myformUpdate.value['tel_fix']:tel_fix;
      this.providerPost.mail = this.myformUpdate.value['mail'] ? this.myformUpdate.value['mail']:mail;
      this.providerPost.city = this.myformUpdate.value['city'] ? this.myformUpdate.value['city']:city;
      this.providerPost.departement = this.myformUpdate.value['departement'] ? this.myformUpdate.value['departement']:departement;
      this.providerPost.code_postal = this.myformUpdate.value['code_postal'] ? this.myformUpdate.value['code_postal']:code_postal;
      this.providerPost.region = this.myformUpdate.value['region'] ? this.myformUpdate.value['region']:region;
      this.providerPost.address = this.myformUpdate.value['address'] ? this.myformUpdate.value['address']:address;

      this.providerService.updateProvider( this.providerPost ).subscribe(providerPostconsole=>{
          try {
            console.log(providerPostconsole.name);
            if(typeof providerPostconsole.name=='undefined'){
              this.addToast({title:'', msg:'Fournisseur avec succès', timeout: 1000, theme:'bootstrap', position:'top-right', type:'success'});
              this.myform.reset();
              setTimeout(() => {this.ngOnInit();}, 1000);
            }
          }catch (e) {
            console.log(e);
            this.addToast({title:'', msg:'Erreur dans la modification du fournisseur', timeout: 1000, theme:'bootstrap', position:'top-right', type:'error'});
          }
        }
      );
    }

    else{

        if(this.myformUpdate.get('mail')['_status'] =="INVALID")
        {
            this.addToast({title:'Email', msg:'l\'email n\'est pas valide', timeout: 1000, theme:'bootstrap', position:'top-right', type:'error'});
        }
    }
  }

  delete(provider:Provider):void{

    this.addToast({title:'', msg:'Fournisseur en cours '+ provider.name, timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
    this.providerService.deleteProvider(provider).subscribe(providerPostconsole=>{

      try {

          console.log(providerPostconsole);
        // if(typeof providerPostconsole.name=='undefined'){
          this.addToast({title:'', msg:'Fournisseur supprimé avec succès', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
          this.myform.reset();
          setTimeout(() => {this.ngOnInit();}, 1000);

        // }

      }catch (e) {
        console.log(e);
        this.addToast({title:'', msg:'Erreur dans la suppression du fournisseur', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
      }
    });
    setTimeout(() => {this.ngOnInit();}, 1000);
  }
}
