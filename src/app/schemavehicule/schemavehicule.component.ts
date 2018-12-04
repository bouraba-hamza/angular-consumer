///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ɵEMPTY_ARRAY} from '@angular/core';
import {SchemaVehicule} from "./SchemaVehicule";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {SchemavehiculeService} from "./schemavehicule.service";
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';
import {Modele} from "../modele/Modele";
import {Marque} from "../marque/Marque";
import * as $ from 'jquery';
import {Http, RequestOptions, ResponseContentType} from "@angular/http";
import { Headers } from '@angular/http';
import {PaginationComponent} from "../pagination/pagination.component";






@Component({
  selector: 'app-schemavehicule',
  templateUrl: './schemavehicule.component.html',
  styleUrls: ['./schemavehicule.component.scss']
})
export class SchemavehiculeComponent {

    @ViewChild(PaginationComponent)
    private paginationComponent: PaginationComponent;


  /* pagination Info */
  pageSize = 5;
  pageNumber = 1;

  schemavehiculeData: any;
  schemavehicule: SchemaVehicule[];
  schemavehiculePost: SchemaVehicule;
  modeles: Modele[];
  marques: Marque[];

  title = 'app';
  position = 'bottom-right';
  msg: string;
  showClose = true;
  res: any;
  timeout = 5000;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  myform: FormGroup;
  myformUpdate: FormGroup;

  id: FormControl;
  marque_id: FormControl;
  modele_id: FormControl;
  modelyear: FormControl;
  image: FormControl;


  rowData: any;
  rowDatas: Observable<any>;

  closeResult: string;


  constructor(private https: Http, private schemavehiculeService: SchemavehiculeService, private http: HttpClient, private modalService: NgbModal, private toastyService: ToastyService) {

  }


  getModele(): void {
    this.schemavehiculeService.getModele()
      .subscribe(modeles => this.modeles = modeles);
  }

  getMarque(): void {
    this.schemavehiculeService.getMarque()
      .subscribe(marques => this.marques = marques);
  }


  resizepage() {

    this.pageSize = this.schemavehiculeData.length;

  }

  ngOnInit() {

    this.createFormControls();
    this.createForm();
    this.createFormControlsUpdate();
    this.createFormUpdate();

    this.getSchemaVehicule();
    this.getMarque();
    this.getModele();

    $('.table-filters input').on('input', function () {


      filterTable($(this).parents('table'));

    });

    $('#modele_select').on('change', function () {


      filterTable_select($(this).parents('table'));

    });

    $('.table-filters input').on('input', function () {


      filterTable($(this).parents('table'));

    });

    $('#marque_select').on('change', function () {


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
      case 'default':
        this.toastyService.default(toastOptions);
        break;
      case 'info':
        this.toastyService.info(toastOptions);
        break;
      case 'success':
        this.toastyService.success(toastOptions);
        break;
      case 'wait':
        this.toastyService.wait(toastOptions);
        break;
      case 'error':
        this.toastyService.error(toastOptions);
        break;
      case 'warning':
        this.toastyService.warning(toastOptions);
        break;
    }
  }

  getSchemaVehicule(): void {


    this.schemavehiculeService.getSchemaVehicule().subscribe(schemavehicule => {
        this.schemavehiculeData = [];
        console.log('test');
        this.schemavehiculeData = schemavehicule
      }
    );
  }


  pageChanged(pN: number): void {

    this.pageNumber = pN;
  }


  createFormControls() {
    this.marque_id = new FormControl('');
    this.modele_id = new FormControl('');
    this.modelyear = new FormControl('');
    this.image = new FormControl('');


  }

  createFormControlsUpdate() {
    this.id = new FormControl('');
    this.marque_id = new FormControl('');
    this.modele_id = new FormControl('');
    this.modelyear = new FormControl('');
    this.image = new FormControl('');

  }


  createForm() {
    this.myform = new FormGroup({
      marque_id: this.marque_id,
      modele_id: this.modele_id,
      modelyear: this.modelyear,
      image: this.image,
    });
  }


  createFormUpdate() {
    this.myformUpdate = new FormGroup({
      id: this.id,
      marque_id: this.marque_id,
      modele_id: this.modele_id,
      modelyear: this.modelyear,
      image: this.image,

    });
  }


  open(content) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  opensm(content) {
    this.modalService.open(content, {}).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }


  onSubmit() {
    if (this.myform.valid) {
      this.schemavehiculePost = new SchemaVehicule();
      this.schemavehiculePost.marque_id = this.myform.value['marque_id'];
      this.schemavehiculePost.modele_id = this.myform.value['modele_id'];
      this.schemavehiculePost.modelyear = this.myform.value['modelyear'];
      this.schemavehiculePost.image = this.myform.value['image'];


      this.schemavehiculeService.addSchemaVehicule(this.schemavehiculePost).subscribe(schemavehiculePostconsole => {
          try {


            this.addToast({
              title: '',
              msg: 'Schéma ajouté avec succès',
              timeout: 1000,
              theme: 'bootstrap',
              position: 'top-right',
              type: 'success'
            });
            this.myform.reset();
            setTimeout(() => {
              this.ngOnInit();
            }, 1000);


          } catch (e) {

            console.log(e);
            this.addToast({
              title: '',
              msg: 'Erreur dans l ajout du schéma',
              timeout: 1000,
              theme: 'bootstrap',
              position: 'top-right',
              type: 'error'
            });
          }


        }
      );


    }
  }

  fileUpload() {

    console.log('test');

    var input_fl: any = document.getElementById('file_loader');
    let marque_id = $('#' + 'marque').val();
    let modele_id = $('#' + 'model').val();
    let modelyear = $('#' + 'year').val();


    let Apidownl = 'http://localhost:8000/api/SchemaVehicule/add';

    let formData: FormData = new FormData();

    var files = input_fl.files;
    let fileList: FileList = files;

    if (fileList.length > 0) {
      console.log('test');
      let file: File = fileList[0];
      formData.append('photo', file, file.name);
    }


    formData.append('marque_id', marque_id + '');
    formData.append('modele_id', modele_id + '');
    formData.append('modelyear', modelyear + '');

    this.addToast({
      title: '',
      msg: 'Image téléchargée avec succès',
      timeout: 1000,
      theme: 'bootstrap',
      position: 'top-right',
      type: 'wait'
    });

    this.http.post(Apidownl, formData).subscribe(schemaconsole => {

        console.log(schemaconsole);
        this.addToast({
          title: '',
          msg: 'Image téléchargée avec succès',
          timeout: 1000,
          theme: 'bootstrap',
          position: 'top-right',
          type: 'success'
        });
        setTimeout(() => {
          this.ngOnInit();
        }, 1000);
      },
      (error) => {
        this.addToast({
          title: '',
          msg: 'Erreur dans le téléchargement de cette image',
          timeout: 1000,
          theme: 'bootstrap',
          position: 'top-right',
          type: 'error'
        });
      }
    );


  }


  onUpdate(id, marque_id, modele_id, modelyear, image) {

    let schema_id = id;
    var image_id: any = document.getElementById('image_id');
    let marque = $('#' + 'marque_id').val();
    let model_id = $('#' + 'model_id').val();
    let year_id = $('#' + 'year_id').val();


    let Apidownl = 'http://localhost:8000/api/SchemaVehicule/update';

    let formData: FormData = new FormData();

    var files = image_id.files;
    let fileList: FileList = files;

    if (fileList.length > 0) {
      console.log('test');
      let file: File = fileList[0];
      formData.append('photo', file, file.name);
    }

    formData.append('id', schema_id + '');
    formData.append('marque_id', marque + '');
    formData.append('modele_id', model_id + '');
    formData.append('modelyear', year_id + '');


    console.log(formData);
    // this.addToast({title:'Please Waiting your Schema', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});

    this.http.post(Apidownl, formData).subscribe(schemaconsole => {

        console.log(schemaconsole);
        this.addToast({
          title: '',
          msg: 'Schéma modifié avec succès',
          timeout: 1000,
          theme: 'bootstrap',
          position: 'top-right',
          type: 'success'
        });
        setTimeout(() => {
          this.ngOnInit();
        }, 1000);
      },
      (error) => {
        this.addToast({
          title: '',
          msg: 'Erreur dans la modification du schéma',
          timeout: 1000,
          theme: 'bootstrap',
          position: 'top-right',
          type: 'error'
        });
      }
    );


  }

  delete(schemavehicule: SchemaVehicule): void {

    this.addToast({
      title: '',
      msg: 'En cours ' + schemavehicule.modelyear,
      timeout: 1000,
      theme: 'bootstrap',
      position: 'top-right',
      type: 'wait'
    });
    this.schemavehiculeService.deleteSchemaVehicule(schemavehicule).subscribe(schemavehiculePostconsole => {

       var test = 'Schéma va être supprimer'+schemavehicule.id;
      // this.journalisationservice.journalisationadd(test).subscribe(journallisation => {
      //
      //
      // } )
      try {

        this.addToast({
          title: '',
          msg: 'Schéma supprimé avec succès',
          timeout: 1000,
          theme: 'bootstrap',
          position: 'top-right',
          type: 'success'
        });
        setTimeout(() => {
          this.ngOnInit();
        }, 1000);


      } catch (e) {

        console.log(e);
        this.addToast({
          title: '',
          msg: 'Erreur dans la suppression du schéma',
          timeout: 1000,
          theme: 'bootstrap',
          position: 'top-right',
          type: 'error'
        });
      }
    });
    setTimeout(() => {
      this.ngOnInit();
    }, 1000);
  }

  seeFile(image){
    window.open('http://localhost/myapp/storage/app/images/'+image,'_blank');
  }

}
