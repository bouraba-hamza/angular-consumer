///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ɵEMPTY_ARRAY} from '@angular/core';
import {Costumer} from "./costumer";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TypesCustomer} from "../typescustomer/TypesCustomer";
import {CostumerService} from "./costumer.service";
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';
import * as $ from 'jquery';
import {Utilisateur} from "../utilisateur/Utilisateur";
import {TypescustomerService} from "../typescustomer/typescustomer.service";
import {PaginationComponent} from "../pagination/pagination.component";


@Component({
  selector: 'app-costumer',
  templateUrl: './costumer.component.html',
  styleUrls: ['./costumer.component.scss']
})
export class CostumerComponent {


    @ViewChild(PaginationComponent)
    private paginationComponent: PaginationComponent;

  /* pagination Info */
  pageSize = 5;
  pageNumber = 1;

  costumerData:any;
  costumer: Costumer[];
  costumerPost : Costumer;
  typescustomer: TypesCustomer[];
  utilisateur: Utilisateur[];


  title = 'app';
  position = 'bottom-right';
  msg: string;
  showClose = true;
  res :any;
  timeout = 5000;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  closeResult: string
  myform: FormGroup;
  myformUpdate: FormGroup;

  id:FormControl;
  name:FormControl;
  contact:FormControl;
  type_id:FormControl;
  phone_number:FormControl;
  mail:FormControl;
  city:FormControl;
  departement:FormControl;
  adress:FormControl;
  user_id:FormControl;
  date_debut_contrat:FormControl;
  api_key:FormControl;
  nombre_appel:FormControl;
  codepostal:FormControl;
  region:FormControl;
  newPlan:FormControl;


  rowData: any;
  rowDatas: Observable<any>;



  constructor(private costumerService: CostumerService,private http: HttpClient,private modalService: NgbModal,private toastyService: ToastyService , public typescustomerService: TypescustomerService) {

  }




  getTypesCustomer(): void {
    this.costumerService.getTypesCustomer()
      .subscribe(typescustomer => this.typescustomer = typescustomer);
  }


  getUtilisateur(): void {
    this.costumerService.getUtilisateur()
      .subscribe(utilisateur => this.utilisateur = utilisateur);
  }

  resizepage(){

    this.pageSize= this.costumerData.length;

  }

  ngOnInit() {

    this.createFormControls();
    this.createForm();
    this.createFormControlsUpdate();
    this.createFormUpdate();

    this.getCostumer();

    this.getTypesCustomer();

    this.getUtilisateur();


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

  getCostumer():void{
    this.costumerService.getCostumer().subscribe(costumer => this.costumerData=costumer);

    console.log(this.costumerData);
  }



  pageChanged(pN: number): void {

    this.pageNumber = pN;
  }




  createFormControls() {
    this.name = new FormControl('');
    this.contact = new FormControl('');
    this.type_id= new FormControl('');
    this.phone_number = new FormControl('');
    this.mail = new FormControl('');
    this.city = new FormControl('');
    this.departement = new FormControl('');
    this.adress = new FormControl('');
    this.user_id = new FormControl('');
    this.date_debut_contrat = new FormControl('');
    this.api_key = new FormControl('');
    this.nombre_appel = new FormControl('');
    this.codepostal = new FormControl('');
    this.region = new FormControl('');
    this.newPlan  = new FormControl('');

  }
  createFormControlsUpdate() {
    this.id = new FormControl('');
    this.name = new FormControl('');
    this.contact = new FormControl('');
    this.type_id = new FormControl('');
    this.phone_number = new FormControl('');
    this.mail = new FormControl('');
    this.city = new FormControl('');
    this.departement = new FormControl('');
    this.adress = new FormControl('');
    this.user_id = new FormControl('');
    this.date_debut_contrat = new FormControl('');
    this.api_key = new FormControl('');
    this.nombre_appel = new FormControl('');
    this.codepostal = new FormControl('');
    this.region = new FormControl('');

  }


  createForm() {
    this.myform = new FormGroup({
      name:this.name,
      contact:this.contact,
      type_id:this.type_id,
      phone_number:this.phone_number,
      mail:this.mail,
      city:this.city,
      departement:this.departement,
      adress:this.adress,
      user_id:this.user_id,
      date_debut_contrat:this.date_debut_contrat,
      api_key:this.api_key,
      nombre_appel:this.nombre_appel,
      codepostal:this.codepostal,
      region:this.region,
      newPlan:this.newPlan,
    });
  }


  createFormUpdate() {
    this.myformUpdate = new FormGroup({
      id:this.id,
      name:this.name,
      contact:this.contact,
      type_id:this.type_id,
      phone_number:this.phone_number,
      mail:this.mail,
      city:this.city,
      departement:this.departement,
      adress:this.adress,
      user_id:this.user_id,
      date_debut_contrat:this.date_debut_contrat,
      api_key:this.api_key,
      nombre_appel:this.nombre_appel,
      codepostal:this.codepostal,
      region:this.region,
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



  countSatfleet: number = 0;
  satfletClick(){
    if(this.countSatfleet % 2 == 0 ) {
      $('#countainerSatfleet').css('display','block');
    }
    else {
      $('#countainerSatfleet').css('display','none');
    }
    this.countSatfleet++;

  }


  satfleetClick(){
    if(this.countSatfleet % 2 == 0 ) {
      $('#countainerSatflee').css('display','block');
    }
    else {
      $('#countainerSatflee').css('display','none');
    }
    this.countSatfleet++;

  }
  // Click(){
  //
  //
  //   if ($('#check_hideshow_new_type').is(':checked')) {
  //     $("#countainer").fadeIn(900);
  //     $("#types_customers_id").attr("disabled", "disabled");
  //   }else{
  //     $("#countainer").fadeOut(300);
  //     $("#types_customers_id").removeAttr("disabled");
  //   }
  //
  // }



  onSubmit() {

    this.costumerPost=  new Costumer();
    this.costumerPost.name = this.myform.value['name'];
    this.costumerPost.contact= this.myform.value['contact'];
    this.costumerPost.type_id = this.myform.value['type_id'];
    this.costumerPost.phone_number = this.myform.value['phone_number'];
    this.costumerPost.mail =this.myform.value['mail'];
    this.costumerPost.city = this.myform.value['city'];
    this.costumerPost.departement = this.myform.value['departement'];
    this.costumerPost.adress = this.myform.value['adress'];
    this.costumerPost.user_id = this.myform.value['user_id'];
    this.costumerPost.date_debut_contrat = this.myform.value['date_debut_contrat'];
    this.costumerPost.api_key = this.myform.value['api_key'];
    this.costumerPost.nombre_appel = this.myform.value['nombre_appel'];
    this.costumerPost.codepostal = this.myform.value['codepostal'];
    this.costumerPost.region = this.myform.value['region'];

    // console.log(this.costumerPost);
    //     let var_type     = $("#nouveau_type").val()   ;
    //     if ($('#check_hideshow_new_type').is(':checked')) {
    //       // let new_type = $("#nouveau_type_manuel").val();
    //        let new_typesCustomer = new TypesCustomer();
    //      //  new_typesCustomer.types =  new_type+'' ;
    //      // console.log(new_type);
    //      //  this.costumerPost.new_type = this.myform.value['new_type'];
    //            // console.log(TypesCustomerPostconsole)
    //       // });
    //
    //       // this.typescustomerService.find_id_by_types_customer( new_type+'' ).subscribe(TypesCustomerPostconsole=> {
    //       //   console.log(TypesCustomerPostconsole);
    //       // });
    //      }else{
    //       this.costumerPost.type_id= this.myform.value['type_id'];
    //     }
    // console.log(this.costumerPost);


    this.costumerService.addCostumer( this.costumerPost ).subscribe(costumerPostconsole=>{
        console.log(costumerPostconsole);
        try {
          //  if(typeof costumerPostconsole.name!='undefined'){

          this.addToast({title:'', msg:'Client ajouté avec succès', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
          this.myform.reset();
          setTimeout(() => {this.ngOnInit();}, 1000);
          //  }
        }catch (e) {
          console.log(e);
          this.addToast({title:'', msg:'Erreur dans l\'ajout du client', timeout: 1000, theme:'bootstrap', position:'top-right', type:'error'});
        }
      }
    );
  }


  onUpdate(id,name,contact,type_id,phone_number,mail,city,departement,adress,user_id,date_debut_contrat,api_key,nombre_appel,codepostal,region){
    // if (this.myformUpdate.valid) {

      this.costumerPost = new Costumer();
      this.costumerPost.id = id;
      this.costumerPost.name = this.myformUpdate.value['name'] ? this.myformUpdate.value['name'] : name;
      this.costumerPost.contact = this.myformUpdate.value['contact'] ? this.myformUpdate.value['contact'] : contact;
      this.costumerPost.type_id = this.myformUpdate.value['type_id'] ? this.myformUpdate.value['type_id'] : type_id;
      this.costumerPost.phone_number = this.myformUpdate.value['phone_number'] ? this.myformUpdate.value['phone_number'] : phone_number;
      this.costumerPost.mail = this.myformUpdate.value['mail'] ? this.myformUpdate.value['mail'] : mail;
      this.costumerPost.city = this.myformUpdate.value['city'] ? this.myformUpdate.value['city'] : city;
      this.costumerPost.departement = this.myformUpdate.value['departement'] ? this.myformUpdate.value['departement'] : departement;
      this.costumerPost.adress = this.myformUpdate.value['adress'] ? this.myformUpdate.value['adress'] : adress;
      this.costumerPost.user_id = this.myformUpdate.value['user_id'] ? this.myformUpdate.value['user_id'] : user_id;
      this.costumerPost.date_debut_contrat = this.myformUpdate.value['date_debut_contrat'] ? this.myformUpdate.value['date_debut_contrat'] : date_debut_contrat;
      this.costumerPost.api_key = this.myformUpdate.value['api_key'] ? this.myformUpdate.value['api_key'] : api_key;
      this.costumerPost.nombre_appel = this.myformUpdate.value['nombre_appel'] ? this.myformUpdate.value['nombre_appel'] : nombre_appel;
      this.costumerPost.codepostal = this.myformUpdate.value['codepostal'] ? this.myformUpdate.value['codepostal'] : codepostal;
      this.costumerPost.region = this.myformUpdate.value['region'] ? this.myformUpdate.value['region'] : region;

    console.log(this.costumerPost);
      this.costumerService.updateCostumer(this.costumerPost).subscribe(costumerPostconsole => {
          try {
            console.log(costumerPostconsole.name);
            // if(typeof costumerPostconsole.name=='undefined'){
            this.addToast({
              title: '',
              msg: 'Client modifié avec succès',
              timeout: 2000,
              theme: 'bootstrap',
              position: 'top-right',
              type: 'success'
            });
            this.myform.reset();
            setTimeout(() => {
              this.ngOnInit();
            }, 1000);
           // }
          } catch (e) {

            this.addToast({
              title: '',
              msg: 'Erreur dans la modification du client',
              timeout: 2000,
              theme: 'bootstrap',
              position: 'top-right',
              type: 'error'
            });
          }

        }
      );


     // }
  }
  d(test)
  {
    console.log('test')
  }
  delete(costumer:Costumer):void{

    this.addToast({title:'', msg:'En cours : '+ costumer.name, timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
    this.costumerService.deleteCostumer(costumer).subscribe(costumerPostconsole=>{

      try {
       console.log(costumerPostconsole);
        if(costumerPostconsole.name=='203')
        {
          this.addToast({title:'', msg:'On peut pas supprimer ce client, est déjà utilisé ', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
        }else{
          this.addToast({title:'', msg:'Client supprimé avec succès', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
          this.myform.reset();
          setTimeout(() => {this.ngOnInit();}, 1000);


        }
      }catch (e) {

        console.log(e);
        this.addToast({title:'', msg:'Erreur dans la suppression du client', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
      }
    });
    setTimeout(() => {this.ngOnInit();}, 1000);
  }




}
