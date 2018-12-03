import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastData, ToastOptions, ToastyService} from "ng2-toasty";
import {ImportationService} from "./importation.service";
import {Movement} from "./Movement";

import * as XLSX from 'xlsx';
type AOA = any[][];

declare const $: any;


@Component({
  selector: 'app-import-product',
  templateUrl: './import-product.component.html',
  styleUrls: ['./import-product.component.css']
})
export class ImportProductComponent implements OnInit {


  movementExcel:AOA;
  movementData:any;
  providertData: any;
  categorietData: any;
  position = 'bottom-right';
  pageSize = 5;
  pageNumber = 1;
  produitCommande : Movement;
  myform: FormGroup;
  myformUpdate: FormGroup;
  closeResult: string;
  id:FormControl;
  plan:FormControl;
  quantity:FormControl;
  order_ref:FormControl;
  provider:FormControl;
  category_id:FormControl;
  observtion:FormControl;
  user_id:FormControl;
  date_arrived:FormControl;




    fileName: string = 'exportproduct.xlsx';

  constructor(private importservice: ImportationService,private http: HttpClient,private modalService: NgbModal,private toastyService: ToastyService) { }


  ngOnInit() {


      this.getMovement();
      this.getFournisseur();
      this.getCategorie();
      this.createFormControls();
      this.createForm();
      this.createFormControlsUpdate();
      this.createFormUpdate();

      $('.table-filters input').on('input', function () {


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


    $('.table-filters input').on('input', function () {


      filterTable($(this).parents('table'));

    });


  }



    getFournisseur()
    {

        this.importservice.getProvider().subscribe(provider =>{this.providertData=provider;
            console.log(this.providertData);
        });
    }

    getCategorie()
    {
        this.importservice.getcategorie().subscribe(categorie =>{this.categorietData=categorie;
            console.log(this.categorietData);
        });

    }


    createFormControls() {
        this.order_ref = new FormControl('', Validators.required);

        this.user_id = new FormControl('');
        this.quantity = new FormControl('');
        this.plan = new FormControl('');
        this.provider = new FormControl('');
        this.category_id = new FormControl('');
        this.observtion = new FormControl('');
        this.date_arrived = new FormControl('');

    }
    createFormControlsUpdate() {
        this.id = new FormControl('');
        this.plan = new FormControl('');
        this.user_id = new FormControl('');
        this.quantity = new FormControl('');
        this.order_ref = new FormControl('');
        this.provider = new FormControl('');
        this.category_id = new FormControl('');
        this.observtion = new FormControl('');
        this.date_arrived = new FormControl('');


    }




    createForm() {
        this.myform = new FormGroup({
            quantity:this.quantity,
            order_ref:this.order_ref,
            provider:this.provider,
            category_id:this.category_id,
            observtion:this.observtion,
            date_arrived:this.date_arrived,

        });
    }
    createFormUpdate() {
        this.myformUpdate = new FormGroup({
            id:this.id,
            order_ref:this.order_ref,
            provider:this.provider,
            category_id:this.category_id,
            observtion:this.observtion,
            date_arrived:this.date_arrived,
            quantity:this.quantity,
        });
    }



    resizepage(){

        this.pageSize= this.movementData.length;

    }


  export(): void {
    console.log('test');
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.movementData);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
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
      this.movementExcel=[];
      this.movementExcel = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));

      console.log(this.movementExcel);
      this.addexportfile(this.movementExcel);
      // this.movementExcel=[];
    };
    reader.readAsBinaryString(target.files[0]);
  }





  pageChanged(pN: number): void {

    this.pageNumber = pN;
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


  getMovement(): void {

    this.importservice.getMovement().subscribe(movement =>{this.movementData=movement;
      console.log(this.movementData);
    });

  }

    addexportfile(movementExcel : any)
    {
        // for (let entry of movementExcel) {
        //   console.log(entry); // 1, "string", false

        this.importservice.addProduct( movementExcel ).subscribe(produitPostconsole => {
            console.log(produitPostconsole);
        });
        // }

    }



    onSubmit() {
        if (this.myform.valid) {
            this.addToast({title:'Please Waiting your commande', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
            this.produitCommande=  new Movement();
            this.produitCommande.user_id = this.myform.value['user_id'];
            this.produitCommande.quantity = this.myform.value['quantity'];
            this.produitCommande.order_ref = this.myform.value['order_ref'];
            this.produitCommande.provider = this.myform.value['provider'];
            this.produitCommande.category_id = this.myform.value['category_id'];
            this.produitCommande.observtion =this.myform.value['observtion'];
            this.produitCommande.date_arrived = this.myform.value['date_arrived'];

            this.importservice.addMovement( this.produitCommande ).subscribe(produitPostconsole=>{
                    try {
                        if(typeof produitPostconsole !='undefined'){

                            this.addToast({title:'notifications Waiting your Commande', msg:'votre commande à été bien ajouter', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                            this.myform.reset();
                            setTimeout(() => {this.ngOnInit();}, 1000);
                        }

                    }catch (e) {

                        console.log(e);
                        this.addToast({title:'notifications Waiting your Produit', msg:'erreur d\'ajout', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                    }

                }
            );



        }
    }



    onUpdate(id,plan,quantity,order_ref,provider,observtion,date_arrived,category_id,user_id){

        if (this.myformUpdate.valid) {
            this.addToast({title:'Please Waiting your Produit', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
            this.produitCommande=  new Movement();
            this.produitCommande.id = id;
            this.produitCommande.user_id = this.myform.value['user_id'] ? this.myformUpdate.value['user_id']:user_id;;
            this.produitCommande.order_ref = this.myformUpdate.value['order_ref'] ? this.myformUpdate.value['order_ref']:order_ref;
            this.produitCommande.provider = this.myformUpdate.value['provider'] ? this.myformUpdate.value['provider']:provider;
            this.produitCommande.quantity = this.myformUpdate.value['quantity'] ? this.myformUpdate.value['quantity']:quantity;
            this.produitCommande.category_id = this.myformUpdate.value['category_id'] ? this.myformUpdate.value['category_id']:category_id;
            this.produitCommande.observtion = this.myformUpdate.value['observtion'] ? this.myformUpdate.value['observtion']:observtion;
            this.produitCommande.date_arrived = this.myformUpdate.value['date_arrived'] ? this.myformUpdate.value['date_arrived']:date_arrived;
            this.produitCommande.plan = this.myformUpdate.value['plan'] ? this.myformUpdate.value['plan']:plan;

            this.importservice.updateCommande( this.produitCommande ).subscribe(produitPostconsole=>{
                    try {
                        console.log(produitPostconsole.id);
                        if(typeof produitPostconsole.id=='undefined'){
                            this.addToast({title:'notifications Waiting your Produit', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                            this.myform.reset();
                            setTimeout(() => {this.ngOnInit();}, 1000);
                        }
                    }catch (e) {

                        this.addToast({title:'notifications Waiting your Produit', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                    }







                }
            );

        }


    }

    delete(commande:Movement):void{

        this.addToast({title:'notifications Waiting your Produit', msg:'waiting please delete operating system '+ commande.order_ref, timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
        this.importservice.deleteCommande(commande).subscribe(produitPostconsole=>{

            try {

                if(typeof produitPostconsole.id =='undefined'){
                    this.addToast({title:'notifications Waiting your commande', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                    this.myform.reset();
                    setTimeout(() => {this.ngOnInit();}, 1000);

                }

            }catch (e) {

                console.log(e);
                this.addToast({title:'notifications Waiting your Produit', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
            }
        });
        setTimeout(() => {this.ngOnInit();}, 1000);
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
