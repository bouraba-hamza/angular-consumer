///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ɵEMPTY_ARRAY} from '@angular/core';
import {Utilisateur} from "./utilisateur";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {UtilisateurService} from "./utilisateur.service";
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';
import {TypesUtilisateur} from "../typesutilisateur/TypesUtilisateur";
import * as $ from 'jquery';
import {PaginationComponent} from "../pagination/pagination.component";



@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent {


    @ViewChild(PaginationComponent)
    private paginationComponent: PaginationComponent;

  /* pagination Info */
  pageSize = 5;
  pageNumber = 1;

  utilisateurData:any;
  utilisateur: Utilisateur[];
  utilisateurPost : Utilisateur;
  typesutilisateur: TypesUtilisateur[];

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
  email:FormControl;
  password:FormControl;
  first_name:FormControl;
  last_name:FormControl;
  phone_number:FormControl;
  adresse:FormControl;
  fonction:FormControl;
  disabled:FormControl;


  rowData: any;
  rowDatas: Observable<any>;

  closeResult: string;


  constructor(private utilisateurService: UtilisateurService,private http: HttpClient,private modalService: NgbModal,private toastyService: ToastyService) {

  }


  getTypesUtilisateur(): void {
    this.utilisateurService.getTypesUtilisateur()
      .subscribe(typesutilisateur => this.typesutilisateur = typesutilisateur);
  }


  resizepage(){

    this.pageSize= this.utilisateurData.length;

  }

  ngOnInit() {

    this.getUtilisateur();
    this.createFormControls();
    this.createForm();
    this.createFormControlsUpdate();
    this.createFormUpdate();
    this.getTypesUtilisateur();


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

  getUtilisateur():void{
    this.utilisateurService.getUtilisateur().subscribe(utilisateur => this.utilisateurData=utilisateur);

    console.log(this.utilisateurData);
  }



  pageChanged(pN: number): void {

    this.pageNumber = pN;
  }




  createFormControls() {
    this.name = new FormControl('');
    this.email = new FormControl('');
    this.password = new FormControl('');
    this.first_name = new FormControl('');
    this.last_name = new FormControl('');
    this.phone_number = new FormControl('');
    this.adresse = new FormControl('');
    this.fonction = new FormControl('');
    this.disabled = new FormControl('');

  }


  createFormControlsUpdate() {
    this.id = new FormControl('');
    this.name = new FormControl('');
    this.email = new FormControl('');
    this.password = new FormControl('');
    this.first_name = new FormControl('');
    this.last_name = new FormControl('');
    this.phone_number = new FormControl('');
    this.adresse = new FormControl('');
    this.fonction = new FormControl('');
    this.disabled = new FormControl('');

  }


  createForm() {
    this.myform = new FormGroup({
      name:this.name,
      email:this.email,
      password:this.password,
      first_name:this.first_name,
      last_name:this.last_name,
      phone_number:this.phone_number,
      adresse:this.adresse,
      fonction:this.fonction,
      disabled:this.disabled,
    });
  }


  createFormUpdate() {
    this.myformUpdate = new FormGroup({
      id:this.id,
      name:this.name,
      email:this.email,
      password:this.password,
      first_name:this.first_name,
      last_name:this.last_name,
      phone_number:this.phone_number,
      adresse:this.adresse,
      fonction:this.fonction,
      disabled:this.disabled,
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
    // if (this.myform.valid) {
      this.utilisateurPost =  new Utilisateur();
      this.utilisateurPost.name = this.myform.value['name'];
      this.utilisateurPost.email = this.myform.value['email'];
      this.utilisateurPost.password = this.myform.value['password'];
      this.utilisateurPost.first_name = this.myform.value['first_name'];
      this.utilisateurPost.last_name = this.myform.value['last_name'];
      this.utilisateurPost.phone_number = this.myform.value['phone_number'];
      this.utilisateurPost.adresse = this.myform.value['adresse'];
      this.utilisateurPost.fonction = this.myform.value['fonction'];
      this.utilisateurPost.disabled = this.myform.value['disabled'];

      this.utilisateurService.addUtilisateur( this.utilisateurPost ).subscribe(utilisateurPostconsole=>{
          try {
            // if(typeof utilisateurPostconsole.name!='undefined'){

              this.addToast({title:'', msg:'Utilisateur ajouté avec succès', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
              this.myform.reset();
              setTimeout(() => {this.ngOnInit();}, 1000);
            // }

          }catch (e) {

            console.log(e);
            this.addToast({title:'', msg:'Erreur dans l ajout de l utilisateur', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
          }

        }
      );

    // }
  }

  onUpdate(num,name,email,password,first_name,last_name,phone_number,adresse,fonction,disabled) {
    console.log(this.myformUpdate);
    // if (this.myformUpdate.valid) {
    this.utilisateurPost = new Utilisateur();
    this.utilisateurPost.id = num;
    this.utilisateurPost.name = this.myformUpdate.value['name'] ? this.myformUpdate.value['name'] : name;
    this.utilisateurPost.email = this.myformUpdate.value['email'] ? this.myformUpdate.value['email'] : email;
    this.utilisateurPost.password = this.myformUpdate.value['password'] ? this.myformUpdate.value['password'] : password;
    this.utilisateurPost.first_name = this.myformUpdate.value['first_name'] ? this.myformUpdate.value['first_name'] : first_name;
    this.utilisateurPost.last_name = this.myformUpdate.value['last_name'] ? this.myformUpdate.value['last_name'] : last_name;
    this.utilisateurPost.phone_number = this.myformUpdate.value['phone_number'] ? this.myformUpdate.value['phone_number'] : phone_number;
    this.utilisateurPost.adresse = this.myformUpdate.value['adresse'] ? this.myformUpdate.value['adresse'] : adresse;
    this.utilisateurPost.fonction = this.myformUpdate.value['fonction'] ? this.myformUpdate.value['fonction'] : fonction;
    this.utilisateurPost.disabled = this.myformUpdate.value['disabled'] ? this.myformUpdate.value['disabled'] : disabled;

    this.utilisateurService.updateUtilisateur(this.utilisateurPost).subscribe(utilisateurPostconsole => {
        try {
          console.log(utilisateurPostconsole.name);
          // if (typeof utilisateurPostconsole.name == 'undefined') {
            this.addToast({title: '', msg: 'Utilisateur modifié avec succès', timeout: 2000, theme: 'bootstrap', position: 'top-right', type: 'success'});
            this.myform.reset();
            setTimeout(() => {this.ngOnInit();}, 1000);
          // }
        } catch (e) {

          this.addToast({title: '', msg: 'Erreur dans la modification de l utilisateur', timeout: 2000, theme: 'bootstrap', position: 'top-right', type: 'error'});
        }

      }
    );

  }

  // }
}
