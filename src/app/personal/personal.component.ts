///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";
import {ToastData, ToastOptions, ToastyService} from "ng2-toasty";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import * as $ from 'jquery';
import {Personal} from "./Personal";
import {PersonalService} from "./personal.service";
import {Utilisateur} from "../utilisateur/Utilisateur";
import {PaginationComponent} from "../pagination/pagination.component";

@Component({
  selector: 'app-installateur',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {


    @ViewChild(PaginationComponent)
    private paginationComponent: PaginationComponent;

  pageSize = 5;
  pageNumber = 1;

  title = 'app';
  position = 'bottom-right';
  msg: string;
  showClose = true;
  res :any;
  timeout = 5000;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  installateurData:any;
  installateus:Personal[];
  utilisateurs:Utilisateur[];

  instaler: number;
  closeResult: string;
  myform: FormGroup;
  myformUpdate: FormGroup;

  id: FormControl;
  first_name:FormControl;
  last_name:FormControl;
  phone_number:FormControl;
  fonction:FormControl;
  utilisateur_id:FormControl;


  constructor(private installateurService: PersonalService, private http: HttpClient, private modalService: NgbModal, private toastyService: ToastyService) {


    function redirectTo($location){
      $location.path('/details-installateur.component.html');
    }
  }


  getUtilisateur(): void {
    this.installateurService.getUtilisateur()
      .subscribe(utilisateurs => this.utilisateurs = utilisateurs);
  }



  createFormUpdate() {
    this.myformUpdate = new FormGroup({
      id:this.id,
      first_name:this.first_name,
      last_name:this.last_name,
      phone_number:this.phone_number,
      fonction:this.fonction,
      utilisateur_id:this.utilisateur_id


    });
  }

  createFormControlsUpdate() {
    this.id = new FormControl('');
    this.first_name = new FormControl('');
    this.last_name = new FormControl('');
    this.phone_number = new FormControl('');
    this.fonction = new FormControl('');
    this.utilisateur_id = new FormControl('');

  }

  ngOnInit() {

    this.createFormControls();
    this.createForm();
    this.createFormControlsUpdate();
    this.createFormUpdate();

    this.getInstallateur();
    this.getUtilisateur();



    $('.table-filters input').on('input', function () {


      filterTable($(this).parents('table'));

    });

    $('#utilisateur_select').on('change', function () {


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





  pageChanged(pN: number): void {

    this.pageNumber = pN;
  }


  createFormControls() {
    this.id = new FormControl('');
    this.first_name = new FormControl('');
    this.last_name = new FormControl('');
    this.phone_number = new FormControl('');
    this.fonction = new FormControl('');
    this.utilisateur_id = new FormControl('');


  }

  createForm() {
    this.myform = new FormGroup({
      id:this.id,
      first_name:this.first_name,
      last_name:this.last_name,
      phone_number:this.phone_number,
      fonction:this.fonction,
      utilisateur_id:this.utilisateur_id


    });
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






  getCountInterventionIncomplete(id): number{
    this.installateurService.getinterventionIncomplete(id).subscribe(
      installateus =>{
        console.log(installateus);
        this.instaler=installateus;
      });
    return this.instaler;
  }


  getInstallateur():void{
    this.installateurService.getInstallateur().subscribe(installateus =>{
      this.installateurData=installateus
    } );
  }


  open(content) {
    this.modalService.open(content, {size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }


  resizepage(){

    // this.pageSize= this.installateurData.length;

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



}
