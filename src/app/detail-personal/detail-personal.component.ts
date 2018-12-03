///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ɵEMPTY_ARRAY} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';
import * as $ from 'jquery';
import {Http} from "@angular/http";
import {DetailPersonal} from "./DetailPersonal";
import {DetailPersonalService} from "./detail-personal.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-detail-personal',
  templateUrl: './detail-personal.component.html',
  styleUrls: ['./detail-personal.component.scss']
})
export class DetailPersonalComponent {

  /* pagination Info */
  pageSize = 5;
  pageNumber = 1;

  detailPersonalData: any;
  detailPersonal: DetailPersonal[];
  detailPersonalPost: DetailPersonal;

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
  detail:any;

  id: FormControl;
  imei_products: FormControl;
  date_products: FormControl;
  label: FormControl;
  date_label: FormControl;
  id_personal: FormControl;


  rowData: any;
  rowDatas: Observable<any>;

  closeResult: string;


  constructor(private https: Http, private detailPersonalService: DetailPersonalService, private http: HttpClient, private modalService: NgbModal, private toastyService: ToastyService,private route: ActivatedRoute) {

  }

  resizepage() {

    this.pageSize = this.detailPersonalData.length;

  }

  ngOnInit() {

    this.createFormControls();
    this.createForm();
    this.createFormControlsUpdate();
    this.createFormUpdate();

    this.getDetailPersonal();


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

  getDetailPersonal(): void {


    this.detailPersonalService.getDetailPersonal().subscribe(detailPersonal => {
        this.detailPersonalData = [];
        console.log('test');
        this.detailPersonalData = detailPersonal
      }
    );
  }


  pageChanged(pN: number): void {

    this.pageNumber = pN;
  }


  createFormControls() {
    this.imei_products = new FormControl('');
    this.date_products = new FormControl('');
    this.label = new FormControl('');
    this.date_label = new FormControl('');
    this.id_personal = new FormControl('');



  }

  createFormControlsUpdate() {
    this.id = new FormControl('');
    this.imei_products = new FormControl('');
    this.date_products = new FormControl('');
    this.label = new FormControl('');
    this.date_label = new FormControl('');
    this.id_personal = new FormControl('');


  }


  createForm() {
    this.myform = new FormGroup({
      imei_products: this.imei_products,
      date_products: this.date_products,
      label: this.label,
      date_label: this.date_label,
      id_personal: this.id_personal,
    });
  }


  createFormUpdate() {
    this.myformUpdate = new FormGroup({
      id: this.id,
      imei_products: this.imei_products,
      date_products: this.date_products,
      label: this.label,
      date_label: this.date_label,
      id_personal: this.id_personal,

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

  getDetail(id){
    if (this.myform.valid) {
      this.detailPersonalPost=  new DetailPersonal();
      this.detailPersonalPost.id =id;

      this.detailPersonalService.getDetail( this.detailPersonalPost ).subscribe(
        detailPostconsole=>{
          try {
            this.detail = detailPostconsole;
            console.log(detailPostconsole);
          }catch (e) {
            console.log(e);
          }
        }
      );
    }
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

}
