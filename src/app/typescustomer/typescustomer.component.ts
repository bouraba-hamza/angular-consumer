import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ɵEMPTY_ARRAY} from '@angular/core';
import {TypesCustomer} from "./TypesCustomer";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TypescustomerService} from "./typescustomer.service";
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-typescustomer',
  templateUrl: './typescustomer.component.html',
  styleUrls: ['./typescustomer.component.scss']
})
export class TypescustomerComponent {

  /* pagination Info */
  pageSize = 5;
  pageNumber = 1;

  TypesCustomerData:any;
  typesCustomer: TypesCustomer[];
  TypesCustomerPost : TypesCustomer;

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
  types:FormControl;


  rowData: any;
  rowDatas: Observable<any>;

  closeResult: string;


  constructor(private typesCustomerService: TypescustomerService,private http: HttpClient,private modalService: NgbModal,private toastyService: ToastyService) {

  }


  resizepage(){

    this.pageSize= this.TypesCustomerData.length;

  }

  ngOnInit() {


    this.getTypesCustomer();
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

  getTypesCustomer():void{
    this.typesCustomerService.getTypesCustomer().subscribe(typesCustomer => this.TypesCustomerData=typesCustomer);
    console.log(this.TypesCustomerData);
  }



  pageChanged(pN: number): void {

    this.pageNumber = pN;
  }




  createFormControls() {

    this.types = new FormControl('');


  }
  createFormControlsUpdate() {
    this.id = new FormControl('');
    this.types = new FormControl('');


  }


  createForm() {
    this.myform = new FormGroup({
      types:this.types,

    });
  }


  createFormUpdate() {
    this.myformUpdate = new FormGroup({
      id:this.id,
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
    if (this.myform.valid) {
      this.addToast({title:'Please Waiting your TypesCustomer', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
      this.TypesCustomerPost=  new TypesCustomer();
      this.TypesCustomerPost.types = this.myform.value['types'];

      this.typesCustomerService.addTypesCustomer( this.TypesCustomerPost ).subscribe(TypesCustomerPostconsole=>{
          try {
            if(typeof TypesCustomerPostconsole.types!='undefined'){

              this.addToast({title:'notifications Waiting your TypesCustomer', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
              this.myform.reset();
              setTimeout(() => {this.ngOnInit();}, 1000);
            }

          }catch (e) {

            console.log(e);
            this.addToast({title:'notifications Waiting your TypesCustomer', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
          }







        }
      );



    }
  }


  onUpdate(id,types){

    if (this.myformUpdate.valid) {
      this.addToast({title:'Please Waiting your TypesCustomer', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
      this.TypesCustomerPost=  new TypesCustomer();
      this.TypesCustomerPost.id = id;
      this.TypesCustomerPost.types = this.myformUpdate.value['types'] ? this.myformUpdate.value['types']:types;

      this.typesCustomerService.updateTypesCustomer( this.TypesCustomerPost ).subscribe(TypesCustomerPostconsole=>{
          try {
            console.log(TypesCustomerPostconsole.types);
            if(typeof TypesCustomerPostconsole.types=='undefined'){
              this.addToast({title:'notifications Waiting your TypesCustomer', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
              this.myform.reset();
              setTimeout(() => {this.ngOnInit();}, 1000);
            }
          }catch (e) {

            this.addToast({title:'notifications Waiting your TypesCustomer', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
          }







        }
      );

    }


  }
  delete(typesCustomer:TypesCustomer):void{

    this.addToast({title:'notifications Waiting your TypesCustomer', msg:'waiting please delete operating system '+ typesCustomer.types, timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
    this.typesCustomerService.deleteTypesCustomer(typesCustomer).subscribe(TypesCustomerPostconsole=>{

      try {

        if(typeof TypesCustomerPostconsole.types=='undefined'){
          this.addToast({title:'notifications Waiting your TypesCustomer', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
          this.myform.reset();
          setTimeout(() => {this.ngOnInit();}, 1000);

        }

      }catch (e) {

        console.log(e);
        this.addToast({title:'notifications Waiting your TypesCustomer', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
      }
    });
    setTimeout(() => {this.ngOnInit();}, 1000);
  }






}
