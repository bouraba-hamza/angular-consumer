import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ɵEMPTY_ARRAY} from '@angular/core';
import {TypesProvider} from "./TypesProvider";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {TypesproviderService} from "./typesprovider.service";
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-typesprovider',
  templateUrl: './typesprovider.component.html',
  styleUrls: ['./typesprovider.component.scss']
})
export class TypesproviderComponent {

  /* pagination Info */
  pageSize = 5;
  pageNumber = 1;

  TypesProviderData:any;
  typesProvider: TypesProvider[];
  TypesProviderPost : TypesProvider;

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


  constructor(private typesProviderService: TypesproviderService,private http: HttpClient,private modalService: NgbModal,private toastyService: ToastyService) {

  }


  resizepage(){

    this.pageSize= this.TypesProviderData.length;

  }

  ngOnInit() {


    this.getTypesProvider();
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

  getTypesProvider():void{
    this.typesProviderService.getTypesProvider().subscribe(typesProvider => this.TypesProviderData=typesProvider);
    console.log(this.TypesProviderData);
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
      this.addToast({title:'Please Waiting your TypesProvider', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
      this.TypesProviderPost=  new TypesProvider();
      this.TypesProviderPost.types = this.myform.value['types'];

      this.typesProviderService.addTypesProvider( this.TypesProviderPost ).subscribe(TypesProviderPostconsole=>{
          try {
            if(typeof TypesProviderPostconsole.types!='undefined'){

              this.addToast({title:'notifications Waiting your TypesProvider', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 1000, theme:'bootstrap', position:'top-right', type:'success'});
              this.myform.reset();
              setTimeout(() => {this.ngOnInit();}, 1000);
            }

          }catch (e) {

            console.log(e);
            this.addToast({title:'notifications Waiting your TypesProvider', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 1000, theme:'bootstrap', position:'top-right', type:'error'});
          }







        }
      );



    }
  }


  onUpdate(id,types){

    if (this.myformUpdate.valid) {
      this.addToast({title:'Please Waiting your TypesProvider', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
      this.TypesProviderPost=  new TypesProvider();
      this.TypesProviderPost.id = id;
      this.TypesProviderPost.types = this.myformUpdate.value['types'] ? this.myformUpdate.value['types']:types;

      this.typesProviderService.updateTypesProvider( this.TypesProviderPost ).subscribe(TypesProviderPostconsole=>{
          try {
            console.log(TypesProviderPostconsole.types);
            if(typeof TypesProviderPostconsole.types=='undefined'){
              this.addToast({title:'notifications Waiting your TypesProvider', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 1000, theme:'bootstrap', position:'top-right', type:'success'});
              this.myform.reset();
              setTimeout(() => {this.ngOnInit();}, 1000);
            }
          }catch (e) {

            this.addToast({title:'notifications Waiting your TypesProvider', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 1000, theme:'bootstrap', position:'top-right', type:'error'});
          }







        }
      );

    }


  }
  delete(typesProvider:TypesProvider):void{

    this.addToast({title:'notifications Waiting your TypesProvider', msg:'waiting please delete operating system '+ typesProvider.types, timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
    this.typesProviderService.deleteTypesProvider(typesProvider).subscribe(TypesProviderPostconsole=>{

      try {

        if(typeof TypesProviderPostconsole.types=='undefined'){
          this.addToast({title:'notifications Waiting your TypesProvider', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
          this.myform.reset();
          setTimeout(() => {this.ngOnInit();}, 1000);

        }

      }catch (e) {

        console.log(e);
        this.addToast({title:'notifications Waiting your TypesProvider', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
      }
    });
    setTimeout(() => {this.ngOnInit();}, 1000);
  }






}
