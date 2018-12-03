import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ɵEMPTY_ARRAY} from '@angular/core';
import {Modele} from "./Modele";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ModeleService} from "./modele.service";
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-modele',
  templateUrl: './modele.component.html',
  styleUrls: ['./modele.component.scss']
})
export class ModeleComponent {

  /* pagination Info */
  pageSize = 5;
  pageNumber = 1;

  ModeleData:any;
  Modele: Modele[];
  ModelePost : Modele;

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
  modele:FormControl;
  marque:FormControl;


  rowData: any;
  rowDatas: Observable<any>;

  closeResult: string;


  constructor(private modeleService: ModeleService,private http: HttpClient,private modalService: NgbModal,private toastyService: ToastyService) {

  }


  resizepage(){

    this.pageSize= this.ModeleData.length;

  }

  ngOnInit() {


    this.getModele();
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

  getModele():void{
    this.modeleService.getModele().subscribe(Modele => this.ModeleData=Modele);
    console.log(this.ModeleData);
  }



  pageChanged(pN: number): void {

    this.pageNumber = pN;
  }




  createFormControls() {

    this.modele = new FormControl('');
    this.marque = new FormControl('');


  }
  createFormControlsUpdate() {
    this.id = new FormControl('');
    this.modele = new FormControl('');
    this.marque = new FormControl('');


  }


  createForm() {
    this.myform = new FormGroup({
      modele:this.modele,
      marque:this.marque,

    });
  }


  createFormUpdate() {
    this.myformUpdate = new FormGroup({
      id:this.id,
      modele:this.modele,
      marque:this.marque,
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
      this.addToast({title:'Please Waiting your Modele', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
      this.ModelePost=  new Modele();
      this.ModelePost.modele = this.myform.value['modele'];
      this.ModelePost.marque = this.myform.value['marque'];


      this.modeleService.addModele( this.ModelePost ).subscribe(ModelePostconsole=>{
          try {
            if(typeof ModelePostconsole.modele!='undefined'){

              this.addToast({title:'notifications Waiting your Modele', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
              this.myform.reset();
              setTimeout(() => {this.ngOnInit();}, 1000);
            }

          }catch (e) {

            console.log(e);
            this.addToast({title:'notifications Waiting your Modele', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
          }







        }
      );



    }
  }


  onUpdate(id,modele,marque){

    if (this.myformUpdate.valid) {
      this.addToast({title:'Please Waiting your Modele', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
      this.ModelePost=  new Modele();
      this.ModelePost.id = id;
      this.ModelePost.modele = this.myformUpdate.value['modele'] ? this.myformUpdate.value['modele']:modele;
      this.ModelePost.marque = this.myformUpdate.value['marque'] ? this.myformUpdate.value['marque']:marque;


      this.modeleService.updateModele( this.ModelePost ).subscribe(ModelePostconsole=>{
          try {
            console.log(ModelePostconsole.modele);
            if(typeof ModelePostconsole.modele=='undefined'){
              this.addToast({title:'notifications Waiting your Modele', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
              this.myform.reset();
              setTimeout(() => {this.ngOnInit();}, 1000);
            }
          }catch (e) {

            this.addToast({title:'notifications Waiting your Modele', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
          }







        }
      );

    }


  }
  delete(modele:Modele):void{

    this.addToast({title:'notifications Waiting your Modele', msg:'waiting please delete operating system '+ modele.modele, timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
    this.modeleService.deleteModele(modele).subscribe(ModelePostconsole=>{

      try {

        if(typeof ModelePostconsole.modele=='undefined'){
          this.addToast({title:'notifications Waiting your Modele', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
          this.myform.reset();
          setTimeout(() => {this.ngOnInit();}, 1000);

        }

      }catch (e) {

        console.log(e);
        this.addToast({title:'notifications Waiting your Modele', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
      }
    });
    setTimeout(() => {this.ngOnInit();}, 1000);
  }






}
